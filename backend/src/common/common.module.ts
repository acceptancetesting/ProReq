// src/common/common.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baseline } from './entities/baseline.entity';
import { Version } from './entities/version.entity';
import { BaselineService } from './services/baseline.service';
import { VersionService } from './services/version.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Baseline, Version]), // Ensure both entities are registered
  ],
  providers: [BaselineService, VersionService], // Provide both services
  exports: [BaselineService, VersionService], // Export both services
})
export class CommonModule {}
