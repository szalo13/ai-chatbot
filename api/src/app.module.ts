import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './module/db/db.module';
import { ChatbotModule } from './module/chatbot/chatbot.module';

@Module({
  imports: [DBModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
