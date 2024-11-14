// src/projects/entities/project.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Requirement } from '../../requirements/entities/requirement.entity';
import { UserProjectRole } from '../../user-project-roles/entities/user-project-role.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Test } from '../../tests/entities/test.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Requirement, (requirement) => requirement.project)
  requirements: Requirement[];

  @OneToMany(() => Ticket, (ticket) => ticket.project)
  tickets: Ticket[];

  @OneToMany(() => Test, (test) => test.project)
  tests: Test[];

  @OneToMany(
    () => UserProjectRole,
    (userProjectRole) => userProjectRole.project,
  )
  userProjectRoles: UserProjectRole[];
}
