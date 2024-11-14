// src/requirements/requirements.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requirement } from './entities/requirement.entity';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class RequirementsService {
  constructor(
    @InjectRepository(Requirement)
    private requirementsRepository: Repository<Requirement>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
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

    const requirement = this.requirementsRepository.create({
      ...createRequirementDto,
      project,
    });

    return this.requirementsRepository.save(requirement);
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
    Object.assign(requirement, updateRequirementDto);
    return this.requirementsRepository.save(requirement);
  }

  async remove(projectId: number, id: number): Promise<void> {
    const requirement = await this.findOne(projectId, id);
    await this.requirementsRepository.remove(requirement);
  }
}
