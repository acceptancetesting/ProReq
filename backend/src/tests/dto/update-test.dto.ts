// src/tests/dto/update-test.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTestDto } from './create-test.dto';

export class UpdateTestDto extends PartialType(CreateTestDto) {}
