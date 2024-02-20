import { Injectable } from '@nestjs/common';
import { ModelSQSHandler } from './base';

@Injectable()
export class ModelDatasourceTranscriptCreatedSQSHandler extends ModelSQSHandler {
  constructor() {
    super();
  }

  public async handle(data: any): Promise<any> {
    return true;
  }
}
