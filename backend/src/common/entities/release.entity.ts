import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  version: string; // e.g., "1.0.0"

  @Column()
  releaseDate: Date;

  @Column('json')
  entities: { entityType: string; entityId: number; version: number }[]; // Entities included in the release
}
