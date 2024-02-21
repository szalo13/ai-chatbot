import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import chatbotConfig from './model.config';
import { DBModule } from '../../db/db.module';
import { AwsModule } from '../../aws/aws.module';
import { ModelController } from './model.controller';
import { DataSourceRepository } from './dataSource/dataSource.repository';
import { DataSourceService } from './dataSource/dataSource.service';
import { DataSourceCreateHandler } from './dataSource/handlers/dataSource.new.handler';
import { ModelService } from './model.service';
import { ModelRepository } from './model.repository';
import { DataSourceUpdateHandlerFactory } from './dataSource/handlers/update/factory';
import { PdfDataSourceUpdateHandler } from './dataSource/handlers/update/pdf';
import { TextDataSourceUpdateHandler } from './dataSource/handlers/update/text';
import { DataSourceController } from './dataSource/dataSource.controller';
import { ModelSqsCronService } from './sqs/model.sqs.cron.service';
import { ModelGateway } from '../model.gateway';

@Module({
  imports: [
    DBModule,
    AwsModule,
    ConfigModule.forRoot({
      load: [chatbotConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [ModelController],
  providers: [
    ConfigService,
    DataSourceRepository,
    DataSourceService,
    DataSourceCreateHandler,
    DataSourceUpdateHandlerFactory,
    DataSourceController,
    PdfDataSourceUpdateHandler,
    TextDataSourceUpdateHandler,
    ModelService,
    ModelController,
    ModelRepository,
    ModelSqsCronService,
    ModelGateway,
  ],
  exports: [ModelService, DataSourceService, DataSourceUpdateHandlerFactory],
})
export class ModelModule {}
