// src/requirementrelations/requirementRelationship.controller.ts

import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { RequirementRelationshipService } from './requirementRelationship.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';

@Controller('requirement-relationships')
export class RequirementRelationshipController {
  constructor(
    private readonly relationshipService: RequirementRelationshipService,
  ) {}

  @Post()
  async create(@Body() createRelationshipDto: CreateRelationshipDto) {
    const { sourceId, targetId, type, metadata } = createRelationshipDto;
    return this.relationshipService.createRelationship(
      sourceId,
      targetId,
      type,
      metadata,
    );
  }

  @Get(':requirementId')
  async findRelationships(@Param('requirementId') requirementId: number) {
    return this.relationshipService.findRelationshipsForRequirement(
      requirementId,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.relationshipService.deleteRelationship(id);
    return { message: 'Relationship deleted successfully' };
  }
}
