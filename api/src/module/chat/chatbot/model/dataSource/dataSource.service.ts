import { Injectable } from '@nestjs/common';
import { DataSourceRepository } from './dataSource.repository';
import { INewDataSource } from './dataSource.model';
import { DataSource } from '@prisma/client';

@Injectable()
export class DataSourceService {
  constructor(private readonly dataSourceRepository: DataSourceRepository) {}

  async findByPublicId(publicId: string) {
    return this.dataSourceRepository.findByPublicId(publicId);
  }

  async create(newDatasource: INewDataSource) {
    return this.dataSourceRepository.create(newDatasource);
  }

  async findAllByModelId(modelId: number) {
    return this.dataSourceRepository.findAllByModelId(modelId);
  }

  async updateByPublicId(publicId: string, data: Partial<DataSource>) {
    return this.dataSourceRepository.updateByPublicId(publicId, data);
  }
}
