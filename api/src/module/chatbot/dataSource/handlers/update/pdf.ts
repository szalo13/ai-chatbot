import { Injectable } from '@nestjs/common';
import { IDataSource } from '../../dataSource.model';
import { DataSourceUpdateHandler } from './base';
import { DataSourceService } from '../../dataSource.service';

@Injectable()
export class PdfDataSourceUpdateHandler extends DataSourceUpdateHandler {
  constructor(private readonly dataSourceService: DataSourceService) {
    super();
  }

  public update(publicId: string): Promise<IDataSource> {
    return this.dataSourceService.findByPublicId(publicId);
  }
}
