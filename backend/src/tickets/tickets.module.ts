// src/tickets/tickets.module.ts

import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Project } from '../projects/entities/project.entity'; // Import Project entity
import { UserProjectRolesModule } from '../user-project-roles/user-project-roles.module';
import { Baseline } from 'src/common/entities/baseline.entity';
import { BaselineService } from 'src/common/services/baseline.service';
import { CommonModule } from 'src/common/common.module'; // Import CommonModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Project, Baseline]), // Combine entities
    UserProjectRolesModule,
    CommonModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService, BaselineService],
})
export class TicketsModule {}
