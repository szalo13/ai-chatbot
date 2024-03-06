// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { ChatStatus } from '@prisma/client';
import { PrismaService } from '../../db/db.service';

const CLIENT_VIEW_INCLUDE = {
  chatbot: {
    select: {
      publicId: true,
      model: {
        select: {
          publicId: true,
        },
      },
    },
  },
  messages: {
    select: {
      publicId: true,
      content: true,
      senderType: true,
      createdAt: true,
    },
  },
};

@Injectable()
export class ChatClientRepository {
  constructor(private prisma: PrismaService) {}

  createAndReturnForClientView(
    clientId: string,
    status: ChatStatus,
    chatbotId: number,
    organizationId: number,
  ) {
    return this.prisma.chat.create({
      data: {
        status: status,
        clientId: clientId,
        organization: { connect: { id: organizationId } },
        chatbot: { connect: { id: chatbotId } },
      },
      include: CLIENT_VIEW_INCLUDE,
    });
  }

  findByClientIdForClientView(clientId: string) {
    return this.prisma.chat.findFirst({
      where: {
        clientId: clientId,
      },
      include: CLIENT_VIEW_INCLUDE,
    });
  }
}
