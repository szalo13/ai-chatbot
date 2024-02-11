import { Controller, Get, Param } from '@nestjs/common';
import { DataSourceService } from './dataSource.service';
import { DataSourceCreateHandler } from './handlers/dataSource.new.handler';

@Controller('/datasource')
export class DataSourceController {
  constructor(
    private readonly dataSourceService: DataSourceService,
    private readonly datasourceCreateHandler: DataSourceCreateHandler,
  ) {}

  @Get('/:publicId')
  async getDatasource(@Param('publicId') publicId: string) {
    return this.dataSourceService.findByPublicId(publicId);
  }

  @Get('/')
  async getAllDatasources() {
    console.log(await this.dataSourceService.findAll());
    return this.dataSourceService.findAll();
  }
}
