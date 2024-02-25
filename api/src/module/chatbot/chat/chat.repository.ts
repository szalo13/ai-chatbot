// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { ChatStatus } from '@prisma/client';
import { PrismaService } from '../../db/db.service';

@Injectable()
export class ChatRepository {
  constructor(private prisma: PrismaService) {}

  create(clientId: string, status: ChatStatus, chatbotId: number) {
    return this.prisma.chat.create({
      data: {
        status: status,
        clientId: clientId,
        chatbot: { connect: { id: chatbotId } },
      },
    });
  }

  findByClientId(clientId: string) {
    return this.prisma.chat.findFirst({
      where: {
        clientId: clientId,
      },
    });
  }
}
