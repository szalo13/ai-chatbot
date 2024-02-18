import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelRepository } from './model.repository';
import { DataSourceService } from '../dataSource/dataSource.service';
import { AwsLambdaService } from '../../aws/aws.lambda.service';
import { ModelConfig } from './model.config';
import { ConfigService } from '@nestjs/config';
import { ChatbotConfig } from '../chatbot.config';
import { DataSourceUtils } from '../dataSource/dataSource.utils';
import { IModelStatus } from './model.model';

interface ITrainModelFile {
  path: string;
}

interface ITrainModel {
  modelOutputPath: string;
  bucket: string;
  files: ITrainModelFile[];
}

interface IQueryModelPayload {
  bucket: string;
  modelId: string;
  query: string;
}

@Injectable()
export class ModelService {
  protected readonly modelConfig: ModelConfig;
  protected readonly chatbotConfig: ChatbotConfig;

  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly datasourceService: DataSourceService,
    private readonly lambdaService: AwsLambdaService,
    private readonly configService: ConfigService,
  ) {
    this.modelConfig = this.configService.get('model');
    this.chatbotConfig = this.configService.get('chatbot');
  }

  async findByPublicIdWithDatasurces(publicId: string) {
    return this.modelRepository.findByPublicIdWithDatasurces(publicId);
  }

  async findByPublicId(publicId: string) {
    return this.modelRepository.findByPublicId(publicId);
  }

  async findAllModelDataSources(publicId: string) {
    const model = await this.findByPublicId(publicId);
    const datasources = await this.datasourceService.findAllByModelId(model.id);
    return datasources;
  }

  async askQuestion(publicId: string, msg: string) {
    const model = await this.modelRepository.findByPublicId(publicId);
    if (!model) throw new NotFoundException('Model not found');

    const payload: IQueryModelPayload = {
      bucket: this.chatbotConfig.uploadBucket,
      modelId: model.publicId,
      query: msg,
    };
    const res = await this.lambdaService.invokeLambda(
      this.modelConfig.queryModelLambdaName,
      payload,
    );
    return JSON.parse(res.data);
  }

  async trainModel(publicId: string) {
    const model = await this.findByPublicIdWithDatasurces(publicId);
    if (!model) throw new NotFoundException('Model not found');

    const payload: ITrainModel = {
      bucket: this.chatbotConfig.uploadBucket,
      modelOutputPath: DataSourceUtils.modelS3OutPath(model.publicId),
      files: model.dataSourceAssets.map((asset) => ({
        path: DataSourceUtils.transcriptS3Path(asset.publicId),
      })),
    };
    await this.lambdaService.invokeLambda(
      this.modelConfig.trainLambdaName,
      payload,
    );

    const res = await this.modelRepository.updateById(model.id, {
      status: IModelStatus.DuringTraining,
    });
    return { ...model, ...res };
  }
}
