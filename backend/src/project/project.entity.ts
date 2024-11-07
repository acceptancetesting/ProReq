// src/projects/project.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserProjectRole } from '../user-project-roles/user-project-role.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => UserProjectRole,
    (userProjectRole) => userProjectRole.project,
  )
  userProjectRoles: UserProjectRole[];
}
