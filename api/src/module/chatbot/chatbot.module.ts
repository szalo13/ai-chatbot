import { Module } from '@nestjs/common';
import { DBModule } from '../db/db.module';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatbotRepository } from './chatbot.repository';
import { DataSourceController } from './dataSource/dataSource.controller';
import { DataSourceRepository } from './dataSource/dataSource.repository';
import { DataSourceService } from './dataSource/dataSource.service';
import { DataSourceCreateHandler } from './dataSource/handlers/dataSource.new.handler';
import { ModelService } from './model/model.service';
import { ModelRepository } from './model/model.repository';
import { ModelController } from './model/model.controller';
import { AwsModule } from '../aws/aws.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import chatbotConfig from './chatbot.config';

@Module({
  imports: [
    DBModule,
    AwsModule,
    ConfigModule.forRoot({
      load: [chatbotConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [ChatbotController, DataSourceController, ModelController],
  providers: [
    ConfigService,
    ChatbotRepository,
    ChatbotService,
    DataSourceRepository,
    DataSourceService,
    DataSourceCreateHandler,
    ModelService,
    ModelRepository,
  ],
})
export class ChatbotModule {}
