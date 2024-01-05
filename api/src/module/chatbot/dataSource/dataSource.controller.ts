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
  getChatbot(@Param('publicId') publicId: string): any {
    return this.dataSourceService.findByPublicId(publicId);
  }
}
