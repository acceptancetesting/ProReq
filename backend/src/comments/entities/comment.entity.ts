// src/comments/entities/comment.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Requirement } from '../../requirements/entities/requirement.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, { eager: true, nullable: false, onDelete: 'CASCADE' })
  createdBy: User;

  @ManyToOne(() => Requirement, (requirement) => requirement.comments, {
    onDelete: 'CASCADE',
  })
  requirement: Requirement;

  @CreateDateColumn()
  createdAt: Date;
}
