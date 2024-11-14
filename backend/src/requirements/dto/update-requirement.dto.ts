// src/requirements/dto/update-requirement.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateRequirementDto } from './create-requirement.dto';

export class UpdateRequirementDto extends PartialType(CreateRequirementDto) {}
