// src/projects/projects.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserProjectRole } from '../user-project-roles/entities/user-project-role.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(UserProjectRole)
    private userProjectRoleRepository: Repository<UserProjectRole>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findAllForUser(userId: number): Promise<Project[]> {
    // Find all UserProjectRoles for the given user
    const userProjectRoles = await this.userProjectRoleRepository.find({
      where: { user: { id: userId } },
      relations: ['project'],
    });

    // Extract projects from the UserProjectRoles
    const projects = userProjectRoles.map((role) => role.project);

    return projects;
  }

  async findOne(id: number): Promise<Project | undefined> {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['requirements'],
    });
  }

  // ... other project-related methods
}
