// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/db.service';
import { MessageSenderType } from './message.model';

@Injectable()
export class MessageRepository {
  constructor(private prisma: PrismaService) {}

  create(content: string, chatId: number, senderType: MessageSenderType) {
    return this.prisma.message.create({
      data: {
        chatId: chatId,
        senderType: senderType,
        content: content,
      },
    });
  }
}
