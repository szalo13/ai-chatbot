import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataSource, INewDataDTO } from '../dataSource.model';
import { DataSourceService } from '../dataSource.service';
import { ModelService } from '../../model.service';
import { AwsS3Service } from '../../../../../aws/aws.s3.service';
import { ConfigService } from '@nestjs/config';
import { ChatbotConfig } from '../../../chatbot.config';
import { DataSourceUtils } from '../dataSource.utils';

interface ICreateDataSourceResult {
  dataSource: IDataSource;
  uploadUrl: string;
}

@Injectable()
export class DataSourceCreateHandler {
  protected readonly chatbotConfig: ChatbotConfig;

  constructor(
    private readonly datasourceService: DataSourceService,
    private readonly modelService: ModelService,
    private readonly s3Service: AwsS3Service,
    private readonly configService: ConfigService,
  ) {
    this.chatbotConfig = this.configService.get('chatbot');
  }

  public async handle(
    publicModelId: string,
    dto: INewDataDTO,
  ): Promise<ICreateDataSourceResult> {
    const model = await this.modelService.findByPublicId(publicModelId);
    if (!model) throw new NotFoundException('Model not found');

    const dataSource = await this.datasourceService.create({
      ...dto,
      name: dto.name || '',
      modelId: model.id,
    });

    return {
      uploadUrl: await this.s3Service.signPut({
        Key: DataSourceUtils.s3PdfPath(dataSource.publicId),
        Bucket: this.chatbotConfig.uploadBucket,
      }),
      dataSource,
    };
  }
}
