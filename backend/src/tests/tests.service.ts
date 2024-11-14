// src/tests/tests.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/test.entity';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(projectId: number, createTestDto: CreateTestDto): Promise<Test> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const test = this.testsRepository.create({
      ...createTestDto,
      project,
    });

    return this.testsRepository.save(test);
  }

  async findAll(projectId: number): Promise<Test[]> {
    return this.testsRepository.find({
      where: { project: { id: projectId } },
      relations: ['project'],
    });
  }

  async findOne(projectId: number, id: number): Promise<Test> {
    const test = await this.testsRepository.findOne({
      where: { id, project: { id: projectId } },
      relations: ['project'],
    });

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    return test;
  }

  async update(
    projectId: number,
    id: number,
    updateTestDto: UpdateTestDto,
  ): Promise<Test> {
    const test = await this.findOne(projectId, id);
    Object.assign(test, updateTestDto);
    return this.testsRepository.save(test);
  }

  async remove(projectId: number, id: number): Promise<void> {
    const test = await this.findOne(projectId, id);
    await this.testsRepository.remove(test);
  }
}
