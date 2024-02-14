import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { INewDataDTO } from '../dataSource/dataSource.model';
import { DataSourceCreateHandler } from '../dataSource/handlers/dataSource.new.handler';
import { JwtGuard } from '../../auth/jwt/jwt.guard';

@Controller('/model')
@UseGuards(JwtGuard)
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
