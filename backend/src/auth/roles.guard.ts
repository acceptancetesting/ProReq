// src/auth/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserProjectRolesService } from '../user-project-roles/user-project-roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userProjectRolesService: UserProjectRolesService, // Ensure service is injected correctly
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const projectId = request.params.projectId || request.body.projectId;

    if (!projectId) {
      const userRolesInProjects =
        await this.userProjectRolesService.findUserRoles(user.userId);
      const userRoleNames = userRolesInProjects.map((upr) => upr.role.name);
      return requiredRoles.some((role) => userRoleNames.includes(role));
    }

    const userProjectRole =
      await this.userProjectRolesService.findUserRoleInProject(
        user.userId,
        projectId,
      );
    if (!userProjectRole || !userProjectRole.role) {
      throw new ForbiddenException('User has no role in this project');
    }
    return requiredRoles.includes(userProjectRole.role.name);
  }
}
