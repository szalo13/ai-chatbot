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
import { MessageClientModule } from './message/message.client.module';
import { MessageModule } from '../message/message.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    MessageClientModule,
    ChatbotModule,
    DBModule,
    MessageModule,
    ChatModule,
  ],
  controllers: [ChatClientController],
  providers: [ChatClientService, ChatClientRepository],
  exports: [ChatClientService],
})
export class ChatClientModule {}
