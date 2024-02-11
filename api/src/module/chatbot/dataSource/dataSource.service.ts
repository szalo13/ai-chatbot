import { Injectable } from '@nestjs/common';
import { DataSourceRepository } from './dataSource.repository';
import { INewDataSource } from './dataSource.model';

@Injectable()
export class DataSourceService {
  constructor(private readonly dataSourceRepository: DataSourceRepository) {}

  async findByPublicId(publicId: string) {
    return this.dataSourceRepository.findByPublicId(publicId);
  }

  async create(newDatasource: INewDataSource) {
    return this.dataSourceRepository.create(newDatasource);
  }

  async findAll() {
    return this.dataSourceRepository.findAll();
  }
}
