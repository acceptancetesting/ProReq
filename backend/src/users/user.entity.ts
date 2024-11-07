// src/users/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserProjectRole } from '../user-project-roles/user-project-role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => UserProjectRole, (userProjectRole) => userProjectRole.user)
  userProjectRoles: UserProjectRole[];
}
