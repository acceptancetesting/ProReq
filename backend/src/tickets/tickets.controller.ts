// src/tickets/tickets.controller.ts

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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('projects/:projectId/tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles('Admin', 'Project Manager')
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return this.ticketsService.create(projectId, createTicketDto);
  }

  @Get()
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester')
  async findAll(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.ticketsService.findAll(projectId);
  }

  @Get(':id')
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester')
  async findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.ticketsService.findOne(projectId, id);
  }

  @Put(':id')
  @Roles('Admin', 'Project Manager')
  async update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(projectId, id, updateTicketDto);
  }

  @Delete(':id')
  @Roles('Admin', 'Project Manager')
  async remove(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.ticketsService.remove(projectId, id);
    return { message: 'Ticket deleted successfully' };
  }
}
