import { Module } from '@nestjs/common';
import { ModelModule } from '../../chatbot/model/model.module';
import { DBModule } from '../../../db/db.module';
import { MessageClientController } from './message.client.controller';
import { MessageModule } from '../../message/message.module';

@Module({
  imports: [DBModule, ModelModule, MessageModule],
  controllers: [MessageClientController],
  providers: [],
})
export class MessageClientModule {}
