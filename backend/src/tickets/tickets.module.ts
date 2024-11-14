// src/tickets/tickets.module.ts

import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Project } from '../projects/entities/project.entity'; // Import Project entity
import { UserProjectRolesModule } from '../user-project-roles/user-project-roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Project]),
    UserProjectRolesModule,
  ], // Include Project here
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
