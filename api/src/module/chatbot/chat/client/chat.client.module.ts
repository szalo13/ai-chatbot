import { Module } from '@nestjs/common';
import { ModelModule } from '../../model/model.module';
import { AwsModule } from '../../../aws/aws.module';
import { DBModule } from '../../../db/db.module';
import { ConfigModule } from '@nestjs/config';
import chatbotConfig from '../../chatbot.config';
import { ChatClientController } from './chat.client.controller';

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
  controllers: [ChatClientController],
  providers: [],
})
export class ChatbotModule {}
