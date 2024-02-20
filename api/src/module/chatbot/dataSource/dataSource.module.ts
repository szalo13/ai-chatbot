import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBModule } from '../../db/db.module';
import { AwsModule } from '../../aws/aws.module';
import { DataSourceRepository } from '../dataSource/dataSource.repository';
import { DataSourceService } from '../dataSource/dataSource.service';
import { DataSourceCreateHandler } from '../dataSource/handlers/dataSource.new.handler';
import { DataSourceUpdateHandlerFactory } from '../dataSource/handlers/update/factory';
import { PdfDataSourceUpdateHandler } from '../dataSource/handlers/update/pdf';
import { TextDataSourceUpdateHandler } from '../dataSource/handlers/update/text';
import chatbotConfig from '../chatbot.config';

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
