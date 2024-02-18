import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { INewDataDTO } from '../dataSource/dataSource.model';
import { DataSourceCreateHandler } from '../dataSource/handlers/dataSource.new.handler';
import { JwtGuard } from '../../auth/jwt/jwt.guard';
import { ModelService } from './model.service';

@Controller('/model')
@UseGuards(JwtGuard)
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    private readonly datasourceCreateHandler: DataSourceCreateHandler,
  ) {}

  @Post('/:modelPublicId/train')
  @HttpCode(200)
  train(@Param('modelPublicId') modelPublicId: string): any {
    return this.modelService.trainModel(modelPublicId);
  }

  @Post('/:modelPublicId/datasource')
  create(
    @Body() newDataSource: INewDataDTO,
    @Param('modelPublicId') modelPublicId: string,
  ): any {
    return this.datasourceCreateHandler.handle(modelPublicId, newDataSource);
  }

  @Get('/:modelPublicId/datasource')
  getDatasources(@Param('modelPublicId') modelPublicId: string): any {
    return this.modelService.findAllModelDataSources(modelPublicId);
  }
}
