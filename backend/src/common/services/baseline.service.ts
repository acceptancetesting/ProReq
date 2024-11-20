import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Baseline } from '../entities/baseline.entity';
import { VersionService } from './version.service';

@Injectable()
export class BaselineService {
  constructor(
    @InjectRepository(Baseline)
    private baselineRepository: Repository<Baseline>,
    private versionService: VersionService,
  ) {
    console.log('BaselineService initialized');
  }

  async createBaseline(
    name: string,
    entities: { entityType: string; entityId: number }[],
  ): Promise<Baseline> {
    const snapshots = await Promise.all(
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

    const baseline = this.baselineRepository.create({
      name,
      createdAt: new Date(),
      entities: snapshots,
    });

    return this.baselineRepository.save(baseline);
  }

  async getBaseline(baselineId: number): Promise<Baseline> {
    return this.baselineRepository.findOne({ where: { id: baselineId } });
  }
}
