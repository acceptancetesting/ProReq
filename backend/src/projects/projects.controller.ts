// src/projects/projects.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Retrieves all projects.
   * Endpoint: GET /projects
   * @returns An array of projects.
   */
  @Get()
  @Roles('Admin', 'Project Manager')
  async findAll() {
    // Since there's no projectId, we need to decide how to handle this.
    // For example, we could allow only users who have roles in any project.
    // Or we might need to redesign the authorization strategy for this route.
    return this.projectsService.findAll();
  }

  /**
   * Retrieves a single project by ID.
   * Endpoint: GET /projects/:projectId
   * @param projectId - The project ID.
   * @returns The project.
   */
  @Get(':projectId')
  @Roles('Admin', 'Project Manager')
  async findOne(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectsService.findOne(projectId);
  }

  /**
   * Creates a new project.
   * Endpoint: POST /projects
   * @param createProjectDto - The project data.
   * @returns The created project.
   */
  @Post()
  @Roles('Admin', 'Project Manager')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
}
