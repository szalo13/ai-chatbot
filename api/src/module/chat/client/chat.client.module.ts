import { Module } from '@nestjs/common';
import { ModelModule } from '../chatbot/model/model.module';
import { AwsModule } from '../../aws/aws.module';
import { DBModule } from '../../db/db.module';
import { ConfigModule } from '@nestjs/config';
import chatbotConfig from '../chatbot/chatbot.config';
import { ChatClientController } from './chat.client.controller';
import { ChatClientService } from './chat.client.service';
import { ChatClientRepository } from './chat.client.repository';
import { ChatbotModule } from '../chatbot/chatbot.module';

@Module({
  imports: [
    DBModule,
    AwsModule,
    ModelModule,
    ChatbotModule,
    ConfigModule.forRoot({
      load: [chatbotConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [ChatClientController],
  providers: [ChatClientService, ChatClientRepository],
})
export class ChatClientModule {}
