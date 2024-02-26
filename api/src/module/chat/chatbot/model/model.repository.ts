// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/db.service';
import { Model } from '@prisma/client';

@Injectable()
export class ModelRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return await this.prisma.model.findUnique({
      where: { id },
    });
  }

  async findByPublicId(publicId: string) {
    return await this.prisma.model.findUnique({
      where: { publicId },
    });
  }

  async findByPublicIdWithDatasurces(publicId: string) {
    return await this.prisma.model.findUnique({
      where: { publicId },
      include: {
        dataSourceAssets: true,
      },
    });
  }

  async updateById(modelId: number, data: Partial<Model>) {
    return await this.prisma.model.update({
      where: { id: modelId },
      data,
    });
  }
}
