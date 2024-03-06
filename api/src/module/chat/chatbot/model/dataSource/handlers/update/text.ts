import { Injectable } from '@nestjs/common';
import { IDataSource } from '../../dataSource.model';
import { DataSourceUpdateHandler } from './base';
import { DataSourceService } from '../../dataSource.service';
import { AwsS3Service } from '../../../../../../aws/aws.s3.service';
import { DataSourceUtils } from '../../dataSource.utils';
import { ConfigService } from '@nestjs/config';
import { ChatbotConfig } from '../../../../chatbot.config';

interface ITextUpdateData {
  text: string;
}

@Injectable()
export class TextDataSourceUpdateHandler extends DataSourceUpdateHandler {
  private readonly chatbotConfig: ChatbotConfig;

  constructor(
    private readonly dataSourceService: DataSourceService,
    private readonly s3Service: AwsS3Service,
    private readonly configService: ConfigService,
  ) {
    super();

    this.chatbotConfig = this.configService.get('chatbot');
  }

  public async update(
    publicId: string,
    data: ITextUpdateData,
  ): Promise<IDataSource> {
    await this.s3Service.upload({
      Key: DataSourceUtils.transcriptS3Path(publicId),
      Body: data.text,
      Bucket: this.chatbotConfig.uploadBucket,
    });
    return await this.dataSourceService.updateByPublicId(publicId, {
      transcriptCreated: true,
    });
  }
}
