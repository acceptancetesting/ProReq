// src/requirementrelations/requirementRelationship.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequirementRelationship } from './entities/requirementRelationship.entity';

@Injectable()
export class RequirementRelationshipService {
  constructor(
    @InjectRepository(RequirementRelationship)
    private readonly relationshipRepository: Repository<RequirementRelationship>,
  ) {}

  async createRelationship(
    sourceId: number,
    targetId: number,
    type: string,
    metadata?: Record<string, any>,
  ): Promise<RequirementRelationship> {
    const relationship = this.relationshipRepository.create({
      sourceRequirement: { id: sourceId },
      targetRequirement: { id: targetId },
      type,
      metadata,
    });
    return this.relationshipRepository.save(relationship);
  }

  async findRelationshipsForRequirement(
    requirementId: number,
  ): Promise<RequirementRelationship[]> {
    return this.relationshipRepository.find({
      where: [
        { sourceRequirement: { id: requirementId } },
        { targetRequirement: { id: requirementId } },
      ],
      relations: ['sourceRequirement', 'targetRequirement'],
    });
  }

  async deleteRelationship(id: number): Promise<void> {
    await this.relationshipRepository.delete(id);
  }
}
