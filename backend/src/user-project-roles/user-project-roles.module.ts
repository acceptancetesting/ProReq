// src/user-project-roles/user-project-roles.module.ts

import { Module } from '@nestjs/common';
import { UserProjectRolesService } from './user-project-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectRole } from './entities/user-project-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjectRole])],
  providers: [UserProjectRolesService],
  exports: [UserProjectRolesService], // Export the service
})
export class UserProjectRolesModule {}
