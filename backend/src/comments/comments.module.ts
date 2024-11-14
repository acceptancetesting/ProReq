// src/comments/comments.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AuthModule } from '../auth/auth.module';
import { UserProjectRolesModule } from '../user-project-roles/user-project-roles.module'; // Import the module

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserProjectRolesModule), // Add this line
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
