import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entityType: string; // e.g., "Requirement", "Ticket", "Test"

  @Column()
  entityId: number; // ID of the associated entity

  @Column()
  version: number; // Version number

  @Column()
  createdAt: Date;

  @Column('json', { nullable: true })
  changes: Record<string, any>; // Captures the change details
}
