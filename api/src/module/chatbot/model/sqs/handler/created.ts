import { Injectable } from '@nestjs/common';
import { ModelSQSHandler } from './base';
import { ModelService } from '../../model.service';
import { ITrainModelResult } from '../../model.model';
import { ModelStatus } from '@prisma/client';

@Injectable()
export class ModelCreatedSQSHandler extends ModelSQSHandler {
  constructor(private readonly modelService: ModelService) {
    super();
  }

  public async handleError(data: ITrainModelResult): Promise<any> {
    await this.modelService.updateById(data.body.modelId, {
      status: ModelStatus.failed,
    });
  }

  public async handle(data: ITrainModelResult): Promise<any> {
    if (!data.success) return this.handleError(data);

    const result = await this.modelService.updateById(data.body.modelId, {
      status: ModelStatus.created,
    });
    console.log(result);
  }
}