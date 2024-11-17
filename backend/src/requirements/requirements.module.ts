// src/requirements/requirements.module.ts

import { Module } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { RequirementsController } from './requirements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';
import { Project } from '../projects/entities/project.entity';
import { UserProjectRolesModule } from '../user-project-roles/user-project-roles.module'; // Import the module
import { RequirementRelationshipModule } from '../requirementrelations/requirementRelationship.module'; // Import the module
import { RequirementRelationship } from '../requirementrelations/entities/requirementRelationship.entity'; // Import the module

@Module({
  imports: [
    TypeOrmModule.forFeature([Requirement, Project, RequirementRelationship]),
    UserProjectRolesModule, // Import the module here
    RequirementRelationshipModule, // Import relationship module
  ],
  controllers: [RequirementsController],
  providers: [RequirementsService],
})
export class RequirementsModule {}
