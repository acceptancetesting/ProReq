// src/user-project-roles/entities/user-project-role.entity.ts

import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class UserProjectRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userProjectRoles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Project, (project) => project.userProjectRoles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => Role, { eager: true, onDelete: 'SET NULL' })
  role: Role;
}
