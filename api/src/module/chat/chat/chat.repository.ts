// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/db.service';

@Injectable()
export class ChatRepository {
  constructor(private prisma: PrismaService) {}

  findByClientIdWithChatbotAndModel(clientId: string) {
    return this.prisma.chat.findFirst({
      where: {
        clientId: clientId,
      },
      include: {
        chatbot: {
          select: {
            id: true,
            publicId: true,
            model: {
              select: {
                id: true,
                publicId: true,
              },
            },
          },
        },
      },
    });
  }

  findManyByOrganizationWithChatbotAndLastMessage(organizationId: number) {
    return this.prisma.chat.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        chatbot: true,
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }
}
