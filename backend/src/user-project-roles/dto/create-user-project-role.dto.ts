// src/user-project-roles/dto/create-user-project-role.dto.ts

import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserProjectRoleDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
