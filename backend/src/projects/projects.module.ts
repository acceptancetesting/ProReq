// src/projects/projects.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UserProjectRolesModule } from '../user-project-roles/user-project-roles.module';
import { ProjectsController } from './projects.controller';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => UserProjectRolesModule),
    AuthModule, // Add AuthModule here
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
