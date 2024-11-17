// src/requirements/dto/create-requirement.dto.ts

import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RelationshipDto {
  @IsInt()
  targetId: number;

  @IsString()
  @IsNotEmpty()
  type: string; // Relationship type: e.g., "Parent-Child", "Dependency"
}

export class CreateRequirementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RelationshipDto)
  relationships?: RelationshipDto[];
}
