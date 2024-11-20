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
import { Version } from 'src/common/entities/version.entity';
import { Baseline } from 'src/common/entities/baseline.entity';
import { Release } from 'src/common/entities/release.entity';
import { VersionService } from 'src/common/services/version.service';
import { BaselineService } from 'src/common/services/baseline.service';
import { ReleaseService } from 'src/common/services/release.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Requirement,
      Project,
      RequirementRelationship,
      Version,
      Baseline,
      Release,
    ]), // Combine all TypeOrm entities
    UserProjectRolesModule, // Import project roles module
    RequirementRelationshipModule, // Import relationships module
  ],
  controllers: [RequirementsController],
  providers: [
    RequirementsService,
    VersionService,
    BaselineService,
    ReleaseService,
  ],
})
export class RequirementsModule {}
