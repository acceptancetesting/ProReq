// src/tags/tags.controller.ts

import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Roles } from '../auth/roles.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  /**
   * Creates a new tag.
   * Endpoint: POST /tags
   * @param createTagDto - The tag data.
   * @returns The created tag.
   */
  @Post()
  @Roles('Admin', 'Project Manager') // Only Admin and Project Manager can create tags
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  /**
   * Retrieves all tags.
   * Endpoint: GET /tags
   * @returns An array of tags.
   */
  @Get()
  @Roles('Admin', 'Project Manager', 'Developer', 'Tester')
  async findAll() {
    return this.tagsService.findAll();
  }

  /**
   * Deletes a tag by ID.
   * Endpoint: DELETE /tags/:id
   * @param id - The tag ID.
   * @returns A confirmation message.
   */
  @Delete(':id')
  @Roles('Admin', 'Project Manager')
  async remove(@Param('id') id: string) {
    // Implement delete logic in TagsService
    // Example:
    // await this.tagsService.remove(+id);
    // return { message: 'Tag deleted successfully' };
    return { message: 'Delete functionality not implemented yet' };
  }
}
