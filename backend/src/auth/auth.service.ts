import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password1: string): Promise<any> {
    console.log('AuthService: Validating user with email:', email);

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      console.log('AuthService: User not found');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('AuthService: User found, validating password...');
    const isPasswordValid = await bcrypt.compare(password1, user.password);
    console.log('AuthService: Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('AuthService: Invalid password');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('AuthService: Password validated successfully');
    const { password, ...result } = user;
    return result;
  }

  /**
   * Login user and generate JWT token.
   * @param loginDto Data Transfer Object containing email and password.
   * @returns Access token and user object.
   */
  async login(loginDto: LoginDto) {
    console.log('AuthService: Login method called with DTO:', loginDto);

    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      console.log('AuthService: User validated:', user);

      const payload = { username: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      console.log('AuthService: Generated access token:', accessToken);

      return {
        access_token: accessToken,
        user,
      };
    } catch (error) {
      console.error('AuthService: Login failed:', error.message);
      throw new UnauthorizedException('Login failed');
    }
  }
}
