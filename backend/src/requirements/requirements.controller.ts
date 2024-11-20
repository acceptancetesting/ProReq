// src/requirements/requirements.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { BaselineService } from '../common/services/baseline.service';

@Controller('projects/:projectId/requirements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RequirementsController {
  constructor(
    private readonly requirementsService: RequirementsService,
    private readonly baselineService: BaselineService, // Inject BaselineService
  ) {}

  /**
   * Creates a new requirement for a project.
   * Endpoint: POST /projects/:projectId/requirements
   */
  @Post()
  @Roles('Admin', 'Project Manager')
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createRequirementDto: CreateRequirementDto,
  ) {
    return this.requirementsService.create(projectId, createRequirementDto);
  }

  /**
   * Retrieves all requirements for a project.
   * Endpoint: GET /projects/:projectId/requirements
   */
  @Get()
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester')
  async findAll(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.requirementsService.findAll(projectId);
  }

  /**
   * Retrieves a single requirement by ID within a project.
   * Endpoint: GET /projects/:projectId/requirements/:id
   */
  @Get(':id')
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester')
  async findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.requirementsService.findOne(projectId, id);
  }

  /**
   * Updates a requirement by ID within a project.
   * Endpoint: PUT /projects/:projectId/requirements/:id
   */
  @Put(':id')
  @Roles('Admin', 'Project Manager')
  async update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequirementDto: UpdateRequirementDto,
  ) {
    return this.requirementsService.update(projectId, id, updateRequirementDto);
  }

  @Post('baseline')
  async createBaseline(
    @Body()
    body: {
      name: string;
      entities: { entityType: string; entityId: number }[];
    },
  ) {
    return this.baselineService.createBaseline(body.name, body.entities);
  }

  /**
   * Deletes a requirement by ID within a project.
   * Endpoint: DELETE /projects/:projectId/requirements/:id
   */
  @Delete(':id')
  @Roles('Admin', 'Project Manager')
  async remove(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.requirementsService.remove(projectId, id);
    return { message: 'Requirement deleted successfully' };
  }
}
