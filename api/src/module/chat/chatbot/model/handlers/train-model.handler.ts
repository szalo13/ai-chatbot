import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ModelService } from '../model.service';
import { IDataSource } from '../dataSource/dataSource.model';
import { ModelConfig } from '../model.config';
import { ChatbotConfig } from '../../chatbot.config';
import { AwsLambdaService } from '../../../../aws/aws.lambda.service';
import { ConfigService } from '@nestjs/config';
import { DataSourceUtils } from '../dataSource/dataSource.utils';
import { IModelStatus, ITrainModelBody } from '../model.model';

@Injectable()
export class TrainModelHandler {
  protected readonly logger: Logger = new Logger(ModelService.name);
  protected readonly modelConfig: ModelConfig;
  protected readonly chatbotConfig: ChatbotConfig;

  constructor(
    private readonly modelService: ModelService,
    private readonly lambdaService: AwsLambdaService,
    private readonly configService: ConfigService,
  ) {
    this.modelConfig = this.configService.get('model');
    this.chatbotConfig = this.configService.get('chatbot');
  }

  async getTranscriptedResourcesS3Paths(assets: IDataSource[]) {
    return assets
      .filter((asset) => asset.transcriptCreated)
      .map((asset) => ({
        path: DataSourceUtils.transcriptS3Path(asset.publicId),
      }));
  }

  async trainModel(publicId: string) {
    const model = await this.modelService.findByPublicIdWithDatasurces(
      publicId,
    );
    if (!model) throw new NotFoundException('Model not found');

    const payload: ITrainModelBody = {
      modelId: model.id,
      modelPublicId: model.publicId,
      bucket: this.chatbotConfig.uploadBucket,
      modelOutputPath: DataSourceUtils.modelS3OutPath(model.publicId),
      files: await this.getTranscriptedResourcesS3Paths(model.dataSourceAssets),
    };

    this.logger.log('Training model', JSON.stringify({ payload }));
    const res = await this.modelService.updateById(model.id, {
      status: IModelStatus.DURING_TRAINING,
    });
    // Do not wait for the lambda to finish
    this.lambdaService
      .invokeLambda(this.modelConfig.trainLambdaName, payload)
      .catch((err) => {
        this.logger.error('Error invoking lambda', err);
      });
    return { ...model, ...res };
  }
}
