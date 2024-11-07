// src/roles/role.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserProjectRole } from '../user-project-roles/user-project-role.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserProjectRole, (userProjectRole) => userProjectRole.role)
  userProjectRoles: UserProjectRole[];
}
