// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email, [
      'userProjectRoles',
      'userProjectRoles.role',
    ]);
    if (user && (await user.validatePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: user.id,
      roles: user.userProjectRoles.map((upr) => ({
        projectId: upr.project.id,
        roleName: upr.role.name,
      })),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
