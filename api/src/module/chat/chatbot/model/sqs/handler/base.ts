import { Injectable } from '@nestjs/common';

export interface IModelSQSEvent<T> {
  success: boolean;
  eventName: ModelSQSEventType;
  body: T;
}

export type ModelSQSEventType =
  | 'model:created'
  | 'model:datasource:transcript-created';

@Injectable()
export abstract class ModelSQSHandler {
  public abstract handle(data: any): Promise<any>;
}
