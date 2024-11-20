// src/tests/tests.module.ts

import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Project } from '../projects/entities/project.entity';
import { UserProjectRolesModule } from '../user-project-roles/user-project-roles.module';
import { CommonModule } from 'src/common/common.module'; // Import CommonModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, Project]),
    UserProjectRolesModule,
    CommonModule, // Import CommonModule here
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
