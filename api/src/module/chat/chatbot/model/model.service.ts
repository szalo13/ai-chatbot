import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ModelRepository } from './model.repository';
import { DataSourceService } from './dataSource/dataSource.service';
import { AwsLambdaService } from '../../../aws/aws.lambda.service';
import { ModelConfig } from './model.config';
import { ConfigService } from '@nestjs/config';
import { ChatbotConfig } from '../chatbot.config';
import { IQueryModelPayload } from './model.model';
import { Model } from '@prisma/client';

@Injectable()
export class ModelService {
  protected readonly logger: Logger = new Logger(ModelService.name);
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

  async updateById(id: number, data: Partial<Model>) {
    return this.modelRepository.updateById(id, data);
  }

  async findByPublicIdWithDatasurces(publicId: string) {
    return this.modelRepository.findByPublicIdWithDatasurces(publicId);
  }

  async findById(id: number) {
    return this.modelRepository.findById(id);
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
      modelId: String(model.id),
      modelPublicId: model.publicId,
      query: msg,
    };
    const res = await this.lambdaService.invokeLambda(
      this.modelConfig.queryModelLambdaName,
      payload,
    );
    const data = JSON.parse(res.data);
    if (data.errorMessage) throw new Error(res.data);

    return JSON.parse(res.data);
  }
}
