// src/user-project-roles/user-project-role.entity.ts

import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../project/project.entity';
import { Role } from '../role/role.entity';

@Entity()
export class UserProjectRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userProjectRoles)
  user: User;

  @ManyToOne(() => Project, (project) => project.userProjectRoles)
  project: Project;

  @ManyToOne(() => Role, (role) => role.userProjectRoles)
  role: Role;
}
