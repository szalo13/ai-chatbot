import { Module } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { DBModule } from '../../db/db.module';
import { MessageController } from './message.controller';

@Module({
  imports: [DBModule],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
