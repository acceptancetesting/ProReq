// src/users/users.controller.ts

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Handles user registration.
   * Endpoint: POST /users/register
   * @param createUserDto - The registration data.
   * @returns The created user object without the password.
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }
}
