// src/requirementrelations/entities/requirement-relationship.entity.ts

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Requirement } from '../../requirements/entities/requirement.entity';

@Entity()
export class RequirementRelationship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Requirement,
    (requirement) => requirement.sourceRelationships,
    {
      onDelete: 'CASCADE',
    },
  )
  sourceRequirement: Requirement;

  @ManyToOne(
    () => Requirement,
    (requirement) => requirement.targetRelationships,
    {
      onDelete: 'CASCADE',
    },
  )
  targetRequirement: Requirement;

  @Column()
  type: string; // e.g., "Parent-Child", "Dependency", etc.

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>; // Optional metadata for the relationship
}
