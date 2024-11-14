// src/tickets/tickets.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(
    projectId: number,
    createTicketDto: CreateTicketDto,
  ): Promise<Ticket> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const ticket = this.ticketsRepository.create({
      ...createTicketDto,
      project,
    });

    return this.ticketsRepository.save(ticket);
  }

  async findAll(projectId: number): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      where: { project: { id: projectId } },
      relations: ['project'],
    });
  }

  async findOne(projectId: number, id: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne({
      where: { id, project: { id: projectId } },
      relations: ['project'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async update(
    projectId: number,
    id: number,
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    const ticket = await this.findOne(projectId, id);
    Object.assign(ticket, updateTicketDto);
    return this.ticketsRepository.save(ticket);
  }

  async remove(projectId: number, id: number): Promise<void> {
    const ticket = await this.findOne(projectId, id);
    await this.ticketsRepository.remove(ticket);
  }
}
