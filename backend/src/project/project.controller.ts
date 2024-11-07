// src/projects/projects.controller.ts

import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('projects')
export class ProjectsController {
  @Roles('Project Manager', 'Developer')
  @Get(':projectId/details')
  getProjectDetails(@Param('projectId') projectId: string) {
    // Implement logic to return project details
  }
}
