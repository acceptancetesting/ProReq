import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from '../entities/version.entity';
import { Release } from '../entities/release.entity';
import { VersionService } from './version.service';

@Injectable()
export class ReleaseService {
  constructor(
    @InjectRepository(Release)
    private releaseRepository: Repository<Release>,
    private versionService: VersionService,
  ) {}

  async createRelease(
    name: string,
    version: string,
    entities: { entityType: string; entityId: number }[],
  ): Promise<Release> {
    const finalizedEntities = await Promise.all(
      entities.map(async (entity) => {
        const latestVersion = await this.versionService.getVersions(
          entity.entityType,
          entity.entityId,
        );
        return {
          entityType: entity.entityType,
          entityId: entity.entityId,
          version: latestVersion[latestVersion.length - 1].version,
        };
      }),
    );

    const release = this.releaseRepository.create({
      name,
      version,
      releaseDate: new Date(),
      entities: finalizedEntities,
    });

    return this.releaseRepository.save(release);
  }

  async getRelease(releaseId: number): Promise<Release> {
    return this.releaseRepository.findOne({ where: { id: releaseId } });
  }
}
