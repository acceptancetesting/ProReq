// src/users/users.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProjectRolesModule } from '../user-project-roles/user-project-roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserProjectRolesModule),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
