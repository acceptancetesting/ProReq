// src/tests/dto/create-test.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  // Add other fields as necessary, along with validation decorators
}
