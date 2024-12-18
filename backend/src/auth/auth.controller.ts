// src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log('AuthController initialized'); // This should print on server start
  }

  /**
   * Handles user login.
   * Endpoint: POST /auth/login
   * @param loginDto - The login data containing email and password.
   * @returns An object containing the JWT access token.
   */
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true })) // Validates and strips unknown properties
  async login(@Body() loginDto: LoginDto) {
    console.log('AuthController: login endpoint hit with data:', loginDto); // Check if this logs
    return this.authService.login(loginDto);
  }
}
