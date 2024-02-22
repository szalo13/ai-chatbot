import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBModule } from '../../../db/db.module';
import { AwsModule } from '../../../aws/aws.module';
import { DataSourceRepository } from './dataSource.repository';
import { DataSourceService } from './dataSource.service';
import { DataSourceCreateHandler } from './handlers/dataSource.new.handler';
import { DataSourceUpdateHandlerFactory } from './handlers/update/factory';
import { PdfDataSourceUpdateHandler } from './handlers/update/pdf';
import { TextDataSourceUpdateHandler } from './handlers/update/text';
import chatbotConfig from '../../chatbot.config';

@Module({
  imports: [
    DBModule,
    AwsModule,
    ConfigModule.forRoot({
      load: [chatbotConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [],
  providers: [
    ConfigService,
    DataSourceRepository,
    DataSourceService,
    DataSourceCreateHandler,
    DataSourceUpdateHandlerFactory,
    PdfDataSourceUpdateHandler,
    TextDataSourceUpdateHandler,
  ],
  exports: [DataSourceService],
})
export class DataSourceModule {}
