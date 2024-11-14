// src/tickets/entities/ticket.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // Other fields...

  @ManyToOne(() => Project, (project) => project.tickets, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
