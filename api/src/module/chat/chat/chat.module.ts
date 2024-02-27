import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { DBModule } from '../../db/db.module';

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [ChatService, ChatRepository],
  exports: [ChatService],
})
export class ChatModule {}
