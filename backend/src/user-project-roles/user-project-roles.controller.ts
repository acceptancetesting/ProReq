// src/user-project-roles/user-project-roles.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserProjectRolesService } from './user-project-roles.service';
import { CreateUserProjectRoleDto } from './dto/create-user-project-role.dto';

@Controller('user-project-roles')
export class UserProjectRolesController {
  constructor(
    private readonly userProjectRolesService: UserProjectRolesService,
  ) {}

  /**
   * Assigns a role to a user within a project.
   * Endpoint: POST /user-project-roles
   * @param createDto - The assignment data.
   * @returns The created UserProjectRole entity.
   */
  @Post()
  async create(@Body() createDto: CreateUserProjectRoleDto) {
    return this.userProjectRolesService.create(createDto);
  }

  /**
   * Retrieves all user-project-role assignments.
   * Endpoint: GET /user-project-roles
   * @returns An array of UserProjectRole entities.
   */
  @Get()
  async findAll() {
    return this.userProjectRolesService.findAll();
  }
}
