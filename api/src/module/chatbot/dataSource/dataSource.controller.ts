import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DataSourceService } from './dataSource.service';
import { JwtGuard } from '../../auth/jwt/jwt.guard';
import { DataSourceUpdateHandlerFactory } from './handlers/update/factory';
import { IDataSourceType } from './dataSource.model';

@Controller('/datasource')
@UseGuards(JwtGuard)
export class DataSourceController {
  constructor(
    private readonly dataSourceService: DataSourceService,
    private readonly dataSourceUpdateFactory: DataSourceUpdateHandlerFactory,
  ) {}

  @Get('/:publicId')
  async getDatasource(@Param('publicId') publicId: string) {
    return this.dataSourceService.findByPublicId(publicId);
  }

  @Put('/:publicId')
  async updateDatasource(
    @Param('publicId') publicId: string,
    @Query('type') type: string,
    @Body() data: any,
  ) {
    return this.dataSourceUpdateFactory.update(
      publicId,
      type as IDataSourceType,
      data,
    );
  }
}
