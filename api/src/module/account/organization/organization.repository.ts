// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/db.service';
import { INewOrganization } from './organization.model';

@Injectable()
export class OrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: INewOrganization) {
    // Create a new chatbot with a default model
    return await this.prisma.organization.create({
      data,
    });
  }

  async findOneByPublicId(publicId: string) {
    return await this.prisma.organization.findUnique({
      where: { publicId },
    });
  }
}
