// src/user-project-roles/user-project-roles.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectRole } from './entities/user-project-role.entity';
import { Repository } from 'typeorm';
import { CreateUserProjectRoleDto } from './dto/create-user-project-role.dto';

@Injectable()
export class UserProjectRolesService {
  constructor(
    @InjectRepository(UserProjectRole)
    private userProjectRolesRepository: Repository<UserProjectRole>,
  ) {}

  async create(createDto: CreateUserProjectRoleDto): Promise<UserProjectRole> {
    // Create a new UserProjectRole with partial relations
    const userProjectRole = this.userProjectRolesRepository.create({
      user: { id: createDto.userId },
      project: { id: createDto.projectId },
      role: { id: createDto.roleId },
    });

    // Save the new UserProjectRole entity
    return this.userProjectRolesRepository.save(userProjectRole);
  }

  async findAll(): Promise<UserProjectRole[]> {
    return this.userProjectRolesRepository.find();
  }

  async findUserRoleInProject(
    userId: number,
    projectId: number,
  ): Promise<UserProjectRole | undefined> {
    return this.userProjectRolesRepository.findOne({
      where: { user: { id: userId }, project: { id: projectId } },
      relations: ['role'],
    });
  }

  async findUserRoles(userId: number): Promise<UserProjectRole[]> {
    return this.userProjectRolesRepository.find({
      where: { user: { id: userId } },
      relations: ['role'],
    });
  }
  // Add more methods as needed (e.g., findByUser, findByProject, etc.)
}
