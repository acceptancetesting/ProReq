// src/users/entities/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserProjectRole } from '../../user-project-roles/entities/user-project-role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hashed password

  @Column()
  name: string;

  @OneToMany(() => UserProjectRole, (userProjectRole) => userProjectRole.user)
  userProjectRoles: UserProjectRole[];
}
