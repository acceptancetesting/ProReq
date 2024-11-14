// src/roles/roles.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * Creates a new role.
   * Endpoint: POST /roles
   * @param body - The role name.
   * @returns The created role.
   */
  @Post()
  async create(@Body('name') name: string) {
    return this.rolesService.create(name);
  }

  /**
   * Retrieves all roles.
   * Endpoint: GET /roles
   * @returns An array of roles.
   */
  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }
}
