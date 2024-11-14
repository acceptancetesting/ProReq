// src/requirements/entities/requirement.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: 'New' })
  status: string; // Consider using enums

  @Column({ default: 'Medium' })
  priority: string; // Consider using enums

  @ManyToOne(() => Project, (project) => project.requirements, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @OneToMany(() => Comment, (comment) => comment.requirement, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.requirements, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
