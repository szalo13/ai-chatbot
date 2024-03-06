// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/db.service';
import { INewUser, IUserUpdate } from './user.model';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createWithOrganization(data: INewUser): Promise<User> {
    const { organization, ...rest } = data;
    // Create a new chatbot with a default model
    return await this.prisma.user.create({
      include: {
        organization: true,
      },
      data: {
        ...rest,
        organization: {
          create: {
            name: organization.name,
          },
        },
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByAuth0IdWithOrganization(auth0Id: string) {
    return await this.prisma.user.findUnique({
      where: { auth0Id },
      include: {
        organization: true,
      },
    });
  }

  async updateByAuth0Id(auth0Id: string, data: IUserUpdate) {
    return await this.prisma.user.update({
      include: {
        organization: true,
      },
      where: { auth0Id },
      data: { name: data.name, email: data.email }, // Update any fields that might have changed
    });
  }
}
