import { Module } from '@nestjs/common';
import { ModelModule } from '../../chatbot/model/model.module';
import { MessageClientController } from './message.client.controller';
import { MessageModule } from '../../message/message.module';
import { MessageClientService } from './message.client.service';
import { ChatModule } from '../../chat/chat.module';

@Module({
  imports: [ModelModule, MessageModule, ChatModule],
  controllers: [MessageClientController],
  providers: [MessageClientService],
})
export class MessageClientModule {}
