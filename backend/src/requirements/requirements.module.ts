// src/requirements/requirements.module.ts

import { Module } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { RequirementsController } from './requirements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';
import { Project } from '../projects/entities/project.entity';
import { UserProjectRolesModule } from '../user-project-roles/user-project-roles.module'; // Import the module

@Module({
  imports: [
    TypeOrmModule.forFeature([Requirement, Project]),
    UserProjectRolesModule, // Import the module here
  ],
  controllers: [RequirementsController],
  providers: [RequirementsService],
})
export class RequirementsModule {}
