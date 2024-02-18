import { Module } from '@nestjs/common';
import { DBModule } from '../db/db.module';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatbotRepository } from './chatbot.repository';
import { DataSourceController } from './dataSource/dataSource.controller';
import { AwsModule } from '../aws/aws.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import chatbotConfig from './chatbot.config';
import { ModelModule } from './model/model.module';

@Module({
  imports: [
    DBModule,
    AwsModule,
    ModelModule,
    ConfigModule.forRoot({
      load: [chatbotConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [ChatbotController, DataSourceController],
  providers: [ConfigService, ChatbotRepository, ChatbotService],
})
export class ChatbotModule {}
