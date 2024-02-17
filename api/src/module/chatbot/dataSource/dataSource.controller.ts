import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DataSourceService } from './dataSource.service';
import { JwtGuard } from '../../auth/jwt/jwt.guard';

@Controller('/datasource')
@UseGuards(JwtGuard)
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @Get('/:publicId')
  async getDatasource(@Param('publicId') publicId: string) {
    return this.dataSourceService.findByPublicId(publicId);
  }
}
