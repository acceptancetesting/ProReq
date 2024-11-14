// src/requirements/dto/create-requirement.dto.ts

import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateRequirementDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsNotEmpty()
  @IsNumber()
  projectId: number; // Ensure this is included
}
