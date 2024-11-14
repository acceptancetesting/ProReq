// src/tests/entities/test.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // Other fields...

  @ManyToOne(() => Project, (project) => project.tests, { onDelete: 'CASCADE' })
  project: Project;
}
