// src/requirements/requirements.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requirement } from './entities/requirement.entity';
import { Project } from '../projects/entities/project.entity';
import { RequirementRelationshipService } from '../requirementrelations/requirementRelationship.service';
import { VersionService } from 'src/common/services/version.service';

@Injectable()
export class RequirementsService {
  constructor(
    @InjectRepository(Requirement)
    private requirementsRepository: Repository<Requirement>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private readonly relationshipService: RequirementRelationshipService,
    private readonly versionService: VersionService,
  ) {}

  async create(
    projectId: number,
    createRequirementDto: CreateRequirementDto,
  ): Promise<Requirement> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const { relationships, ...requirementData } = createRequirementDto;

    // Create the requirement
    const requirement = this.requirementsRepository.create({
      ...requirementData,
      project,
    });

    const savedRequirement =
      await this.requirementsRepository.save(requirement);

    // Handle relationships if provided
    if (relationships && relationships.length > 0) {
      const relationshipEntities = relationships.map((rel) =>
        this.relationshipService.createRelationship(
          savedRequirement.id,
          rel.targetId,
          rel.type,
        ),
      );
      await Promise.all(relationshipEntities); // Ensure all relationships are saved
    }

    return savedRequirement;
  }

  async findAll(projectId: number): Promise<Requirement[]> {
    return this.requirementsRepository.find({
      where: { project: { id: projectId } },
      relations: ['project'],
    });
  }

  async findOne(projectId: number, id: number): Promise<Requirement> {
    const requirement = await this.requirementsRepository.findOne({
      where: { id, project: { id: projectId } },
      relations: ['project'],
    });

    if (!requirement) {
      throw new NotFoundException('Requirement not found');
    }

    return requirement;
  }

  async update(
    projectId: number,
    id: number,
    updateRequirementDto: UpdateRequirementDto,
  ): Promise<Requirement> {
    const requirement = await this.findOne(projectId, id);

    // Create a version
    await this.versionService.createVersion(
      'Requirement',
      id,
      updateRequirementDto,
    );

    Object.assign(requirement, updateRequirementDto);
    return this.requirementsRepository.save(requirement);
  }

  async remove(projectId: number, id: number): Promise<void> {
    const requirement = await this.findOne(projectId, id);
    await this.requirementsRepository.remove(requirement);
  }

  async findRequirementWithRelationships(id: number) {
    const requirement = await this.requirementsRepository.findOneBy({ id });
    if (!requirement) throw new Error('Requirement not found');

    const relationships =
      await this.relationshipService.findRelationshipsForRequirement(id);
    return { ...requirement, relationships };
  }
}
