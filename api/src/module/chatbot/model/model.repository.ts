// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/db.service';

@Injectable()
export class ModelRepository {
  constructor(private prisma: PrismaService) {}

  async findByPublicId(publicId: string) {
    return await this.prisma.model.findUnique({
      where: { publicId },
    });
  }
}
