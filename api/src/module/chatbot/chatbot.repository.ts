// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/db.service';
import { INewChatbot } from './chatbot.model';

const CHATBOT_INCLUDE = {
  model: {
    select: {
      publicId: true,
      status: true,
    },
  },
};
@Injectable()
export class ChatbotRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: INewChatbot) {
    // Create a new chatbot with a default model
    return await this.prisma.chatbot.create({
      data: {
        name: data.name,
        model: {
          create: {
            status: data.status,
          },
        },
      },
    });
  }

  async findByPublicId(publicId: string) {
    return await this.prisma.chatbot.findUnique({
      where: { publicId },
      include: CHATBOT_INCLUDE,
    });
  }
}
