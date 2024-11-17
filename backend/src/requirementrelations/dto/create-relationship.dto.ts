// src/requirementrelations/dto/create-relationship.dto.ts

import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRelationshipDto {
  @IsInt()
  sourceId: number;

  @IsInt()
  targetId: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
