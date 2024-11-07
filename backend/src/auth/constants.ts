// src/auth/constants.ts

import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'defaultSecretKey',
};
