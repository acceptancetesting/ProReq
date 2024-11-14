// src/tests/tests.controller.ts

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
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('projects/:projectId/tests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @Roles('Admin', 'Project Manager')
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createTestDto: CreateTestDto,
  ) {
    return this.testsService.create(projectId, createTestDto);
  }

  @Get()
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester')
  async findAll(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.testsService.findAll(projectId);
  }

  @Get(':id')
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester')
  async findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.testsService.findOne(projectId, id);
  }

  @Put(':id')
  @Roles('Admin', 'Project Manager')
  async update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestDto: UpdateTestDto,
  ) {
    return this.testsService.update(projectId, id, updateTestDto);
  }

  @Delete(':id')
  @Roles('Admin', 'Project Manager')
  async remove(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.testsService.remove(projectId, id);
    return { message: 'Test deleted successfully' };
  }
}
