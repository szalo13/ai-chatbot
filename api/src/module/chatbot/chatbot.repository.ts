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

const SINGLE_CHATBOT_INCLUDE = {
  model: {
    select: {
      publicId: true,
      status: true,
      dataSourceAssets: {
        select: {
          publicId: true,
          type: true,
          name: true,
          fileName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
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
            dataSourceAssets: {
              create: {
                name: 'First data source',
                type: 'text',
                fileName: '',
              },
            },
            status: data.status,
          },
        },
      },
    });
  }

  async findByPublicId(publicId: string) {
    return await this.prisma.chatbot.findUnique({
      where: { publicId },
      include: SINGLE_CHATBOT_INCLUDE,
    });
  }

  async findMany() {
    return await this.prisma.chatbot.findMany({
      include: CHATBOT_INCLUDE,
    });
  }
}
