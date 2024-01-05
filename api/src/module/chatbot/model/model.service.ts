import { Injectable } from '@nestjs/common';
import { ModelRepository } from './model.repository';

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: ModelRepository) {}

  findByPublicId(publicId: string) {
    return this.modelRepository.findByPublicId(publicId);
  }
}
