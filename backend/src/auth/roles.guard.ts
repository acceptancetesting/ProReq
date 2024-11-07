// src/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserProjectRolesService } from '../user-project-roles/user-project-roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private uprService: UserProjectRolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const projectId = parseInt(request.params.projectId, 10); // Assuming projectId is in route params

    const userProjectRole = await this.uprService.getUserRoleInProject(
      user.userId,
      projectId,
    );

    if (!userProjectRole) {
      return false;
    }

    return requiredRoles.includes(userProjectRole.role.name);
  }
}
