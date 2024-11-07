// src/user-project-roles/user-project-roles.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectRole } from './user-project-role.entity';
import { UserProjectRolesService } from './user-project-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjectRole])],
  providers: [UserProjectRolesService],
  exports: [UserProjectRolesService],
})
export class UserProjectRolesModule {}
