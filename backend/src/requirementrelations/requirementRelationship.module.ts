// src/requirementrelations/requirementRelationship.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequirementRelationship } from './entities/requirementRelationship.entity';
import { RequirementRelationshipService } from './requirementRelationship.service';
import { RequirementRelationshipController } from './requirementRelationship.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequirementRelationship])],
  providers: [RequirementRelationshipService],
  controllers: [RequirementRelationshipController],
  exports: [RequirementRelationshipService],
})
export class RequirementRelationshipModule {}
