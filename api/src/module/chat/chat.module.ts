import { Module } from '@nestjs/common';
import { ModelModule } from './chatbot/model/model.module';
import { AwsModule } from '../aws/aws.module';
import { DBModule } from '../db/db.module';
import { ConfigModule } from '@nestjs/config';
import { ChatClientModule } from './client/chat.client.module';
import chatbotConfig from './chatbot/chatbot.config';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    DBModule,
    AwsModule,
    ModelModule,
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
