import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { MessageSenderType } from './message.model';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(content: string, chatId: number, senderType: MessageSenderType) {
    return this.messageRepository.create(content, chatId, senderType);
  }

  async findManyByChatPublicId(chatPublicId: string) {
    return this.messageRepository.findManyByChatPublicId(chatPublicId);
  }
}
