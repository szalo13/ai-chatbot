import { Module } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { DBModule } from '../../db/db.module';

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
