import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from '../entities/version.entity';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private versionRepository: Repository<Version>,
  ) {}

  async createVersion(
    entityType: string,
    entityId: number,
    changes: Record<string, any>,
  ): Promise<Version> {
    const latestVersion = await this.versionRepository.findOne({
      where: { entityType, entityId },
      order: { version: 'DESC' },
    });

    const version = this.versionRepository.create({
      entityType,
      entityId,
      version: (latestVersion?.version || 0) + 1,
      createdAt: new Date(),
      changes,
    });

    return this.versionRepository.save(version);
  }

  async getVersions(entityType: string, entityId: number): Promise<Version[]> {
    return this.versionRepository.find({
      where: { entityType, entityId },
      order: { version: 'ASC' },
    });
  }
}
