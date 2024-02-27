import { Module } from '@nestjs/common';
import { ModelModule } from './chatbot/model/model.module';
import { AwsModule } from '../aws/aws.module';
import { DBModule } from '../db/db.module';
import { ConfigModule } from '@nestjs/config';
import { ChatClientModule } from './client/chat.client.module';
import chatbotConfig from './chatbot/chatbot.config';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [
    DBModule,
    AwsModule,
    ModelModule,
    ChatService,
    ChatRepository,
    ChatClientModule,
    ChatbotModule,
    ConfigModule.forRoot({
      load: [chatbotConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class ChatModule {}
