// src/common/exceptions/ProjectIdMissingException.ts

import { ForbiddenException } from '@nestjs/common';

export class ProjectIdMissingException extends ForbiddenException {
  constructor() {
    super('Project ID is required for authorization');
  }
}
