import { Injectable } from '@nestjs/common';
import { ModelRepository } from './model.repository';
import { DataSourceService } from '../dataSource/dataSource.service';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly datasourceService: DataSourceService,
  ) {}

  async findByPublicId(publicId: string) {
    return this.modelRepository.findByPublicId(publicId);
  }

  async findAllModelDataSources(publicId: string) {
    const model = await this.findByPublicId(publicId);
    const datasources = await this.datasourceService.findAllByModelId(model.id);
    return datasources;
  }
}
