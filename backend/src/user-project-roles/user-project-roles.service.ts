// src/user-project-roles/user-project-roles.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectRole } from './user-project-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProjectRolesService {
  constructor(
    @InjectRepository(UserProjectRole)
    private uprRepository: Repository<UserProjectRole>,
  ) {}

  async assignRoleToUser(
    userId: number,
    projectId: number,
    roleId: number,
  ): Promise<UserProjectRole> {
    const upr = this.uprRepository.create({
      user: { id: userId },
      project: { id: projectId },
      role: { id: roleId },
    });
    return this.uprRepository.save(upr);
  }

  async getUserRoleInProject(
    userId: number,
    projectId: number,
  ): Promise<UserProjectRole | undefined> {
    return this.uprRepository.findOne({
      where: { user: { id: userId }, project: { id: projectId } },
      relations: ['role'],
    });
  }
}
