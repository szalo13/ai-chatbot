import { Injectable } from '@nestjs/common';
import { ModelSQSEventType, ModelSQSHandler } from './base';
import { ModelDatasourceTranscriptCreatedSQSHandler } from './transcript-created';
import { ModelCreatedSQSHandler } from './created';

@Injectable()
export class ModelSQSHandlerFactory {
  constructor(
    private readonly created: ModelCreatedSQSHandler,
    private readonly transcriptCreated: ModelDatasourceTranscriptCreatedSQSHandler,
  ) {}

  handlers: Record<ModelSQSEventType, ModelSQSHandler> = {
    'model-created': this.created,
    'datasource-transcript-created': this.transcriptCreated,
  };

  public async handle(eventName: string, data: any): Promise<any> {
    const handler = this.handlers[eventName];
    if (!handler) throw new Error(`No handler found for event ${eventName}`);

    return handler.handle(data);
  }
}
