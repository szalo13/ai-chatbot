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

@Module({
  imports: [DBModule],
  controllers: [ChatbotController, DataSourceController, ModelController],
  providers: [
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
