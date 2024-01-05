import { Module } from '@nestjs/common';
import { DBModule } from '../db/db.module';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatbotRepository } from './chatbot.repository';

@Module({
  imports: [DBModule],
  controllers: [ChatbotController],
  providers: [ChatbotRepository, ChatbotService],
})
export class ChatbotModule {}
