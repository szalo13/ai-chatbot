import { Injectable } from '@nestjs/common';

export type ModelSQSEventType =
  | 'model-created'
  | 'datasource-transcript-created';

@Injectable()
export abstract class ModelSQSHandler {
  public abstract handle(data: any): Promise<any>;
}
