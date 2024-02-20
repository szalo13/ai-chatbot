// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/db.service';
import { INewDataSource } from './dataSource.model';

@Injectable()
export class DataSourceRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: INewDataSource) {
    // Create a new chatbot with a default model
    return await this.prisma.dataSource.create({
      data: data,
    });
  }

  async findByPublicId(publicId: string) {
    return await this.prisma.dataSource.findUnique({
      where: { publicId },
    });
  }

  async findAllByModelId(modelId: number) {
    return await this.prisma.dataSource.findMany({ where: { modelId } });
  }
}
