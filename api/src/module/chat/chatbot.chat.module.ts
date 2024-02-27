import { Module } from '@nestjs/common';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ChatClientModule } from './client/chat.client.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ChatModule, ChatbotModule, MessageModule, ChatClientModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ChatbotChatModule {}
