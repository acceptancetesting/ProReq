import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    const jwtSecret =
      configService.get<string>('JWT_SECRET') || 'defaultSecret';
    console.log('JwtStrategy: Using JWT_SECRET:', jwtSecret);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Validate the JWT payload.
   * @param payload Decoded JWT payload.
   * @returns Object containing userId and username if valid.
   */
  async validate(payload: any) {
    console.log('JwtStrategy: Validating JWT payload:', payload);

    if (!payload || !payload.sub || !payload.username) {
      console.error('JwtStrategy: Invalid payload structure');
      return null;
    }

    console.log('JwtStrategy: Payload validated successfully');
    return { userId: payload.sub, username: payload.username };
  }
}
