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
import { RequirementRelationship } from '../../requirementrelations/entities/requirementRelationship.entity';

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: 'New' })
  status: string;

  @Column({ default: 'Medium' })
  priority: string;

  @ManyToOne(() => Project, (project) => project.requirements, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @OneToMany(() => Comment, (comment) => comment.requirement, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.requirements, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(
    () => RequirementRelationship,
    (relationship) => relationship.sourceRequirement,
    { cascade: true },
  )
  sourceRelationships: RequirementRelationship[];

  @OneToMany(
    () => RequirementRelationship,
    (relationship) => relationship.targetRequirement,
    { cascade: true },
  )
  targetRelationships: RequirementRelationship[];
}
