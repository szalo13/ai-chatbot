import { Body, Controller, Param, Post } from '@nestjs/common';
import { INewDataDTO } from '../dataSource/dataSource.model';
import { DataSourceCreateHandler } from '../dataSource/handlers/dataSource.new.handler';

@Controller('/model')
export class ModelController {
  constructor(
    private readonly datasourceCreateHandler: DataSourceCreateHandler,
  ) {}

  @Post('/:modelPublicId/datasource')
  create(
    @Body() newDataSource: INewDataDTO,
    @Param('modelPublicId') modelPublicId: string,
  ): any {
    return this.datasourceCreateHandler.handle(modelPublicId, newDataSource);
  }
}
