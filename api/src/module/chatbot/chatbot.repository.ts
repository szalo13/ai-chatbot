// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/db.service';
import { INewChatbot } from './chatbot.model';

const CHATBOT_LIST_INCLUDE = {
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

  async createWithModelAndDatasource(
    organizationId: number,
    data: INewChatbot,
  ) {
    // Create a new chatbot with a default model
    return await this.prisma.chatbot.create({
      data: {
        name: data.name,
        organization: { connect: { id: organizationId } },
        model: {
          create: {
            organizationId: organizationId,
            // Assuming 'status' and 'dataSourceAssets' are valid fields for 'Model'
            status: data.status,
            dataSourceAssets: {
              create: {
                name: 'First data source',
                type: 'text',
                fileName: '',
              },
            },
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

  async findManyByOrganizationId(organizationId: number) {
    return await this.prisma.chatbot.findMany({
      where: { organizationId },
      include: CHATBOT_LIST_INCLUDE,
    });
  }
}
