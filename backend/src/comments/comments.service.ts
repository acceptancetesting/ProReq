// src/comments/comments.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const { content, requirementId } = createCommentDto;
    const comment = this.commentsRepository.create({
      content,
      requirement: { id: requirementId } as any, // Simplified relation
      createdBy: user,
    });
    return this.commentsRepository.save(comment);
  }

  async findAll(requirementId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { requirement: { id: requirementId } },
      relations: ['createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  // ... other comment-related methods
}
