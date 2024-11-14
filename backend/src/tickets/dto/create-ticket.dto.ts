// src/tickets/dto/create-ticket.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  // Add other fields as necessary, along with validation decorators
}
