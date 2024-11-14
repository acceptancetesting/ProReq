// src/comments/dto/create-comment.dto.ts

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  requirementId: number;
}
