// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/db.service';
import { INewUser, IUserUpdate } from './user.model';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: INewUser) {
    // Create a new chatbot with a default model
    return await this.prisma.user.create({
      data,
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByAuth0Id(auth0Id: string) {
    return await this.prisma.user.findUnique({
      where: { auth0Id },
    });
  }

  async updateByAuth0Id(auth0Id: string, data: IUserUpdate) {
    return await this.prisma.user.update({
      where: { auth0Id },
      data: { name: data.name, email: data.email }, // Update any fields that might have changed
    });
  }
}
