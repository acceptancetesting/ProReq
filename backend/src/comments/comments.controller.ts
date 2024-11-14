// src/comments/comments.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Roles } from '../auth/roles.decorator';
// import { RolesGuard } from '../auth/roles.guard';
import { Request } from 'express';
import { Query, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * Retrieves all comments for a specific requirement.
   * Endpoint: GET /comments?requirementId=1
   * @param requirementId - The requirement ID.
   * @returns An array of comments.
   */
  @Get()
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester')
  async findAll(@Query('requirementId', ParseIntPipe) requirementId: number) {
    return this.commentsService.findAll(requirementId);
  }
  /**
   * Creates a new comment for a requirement.
   * Endpoint: POST /comments
   * @param createCommentDto - The comment data.
   * @param req - The request object to access the authenticated user.
   * @returns The created comment.
   */
  @Post()
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester') // Accessible to multiple roles
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const user = req.user; // Now recognized by TypeScript
    return this.commentsService.create(createCommentDto, user);
  }
}
