// src/tags/entities/tag.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Requirement } from '../../requirements/entities/requirement.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Requirement, (requirement) => requirement.tags)
  requirements: Requirement[];
}
