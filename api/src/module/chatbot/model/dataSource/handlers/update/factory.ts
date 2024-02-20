import { Injectable } from '@nestjs/common';
import { IDataSource, IDataSourceType } from '../../dataSource.model';
import { DataSourceUpdateHandler } from './base';
import { TextDataSourceUpdateHandler } from './text';
import { PdfDataSourceUpdateHandler } from './pdf';

@Injectable()
export class DataSourceUpdateHandlerFactory {
  constructor(
    private readonly textDataSourceUpdateHandler: TextDataSourceUpdateHandler,
    private readonly pdfDataSourceUpdateHandler: PdfDataSourceUpdateHandler,
  ) {}

  private handlers: Record<IDataSourceType, DataSourceUpdateHandler> = {
    text: this.textDataSourceUpdateHandler,
    pdf: this.pdfDataSourceUpdateHandler,
  };

  public update(
    publicId: string,
    type: IDataSourceType,
    data: any,
  ): Promise<IDataSource> {
    return this.handlers[type].update(publicId, data);
  }
}
