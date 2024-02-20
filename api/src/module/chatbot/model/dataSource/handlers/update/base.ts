import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class DataSourceUpdateHandler {
  public abstract update(publicId: string, data: any): Promise<any>;
}
