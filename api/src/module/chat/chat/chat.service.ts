import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { User } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async findByClientIdWithChatbotAndModel(clientId: string) {
    if (!clientId) throw new Error('clientId is required');
    return this.chatRepository.findByClientIdWithChatbotAndModel(clientId);
  }

  async findManyByOrganization(user: User) {
    return this.chatRepository.findManyByOrganizationWithChatbotAndLastMessage(
      user.organizationId,
    );
  }

  async findByPublicId(user: User, chatPublicId: string) {
    const chat = await this.chatRepository.findByPublicIdWithChatbotAndModel(
      chatPublicId,
    );
    if (!chat) throw new NotFoundException('Chat not found');

    if (chat.organizationId !== user.organizationId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return chat;
  }
}
