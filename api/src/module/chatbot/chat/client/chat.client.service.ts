import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../chat.repository';
import { INewClientChat } from './chat.client.model';
import { ChatStatus } from '../chat.model';
import { v4 as uuidv4 } from 'uuid';
import { ChatbotRepository } from '../../chatbot.repository';

@Injectable()
export class ChatClientService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly chatbotRepository: ChatbotRepository,
  ) {}

  async findByClientId(clientId: string) {
    if (!clientId) throw new Error('clientId is required');

    const chat = await this.chatRepository.findByClientId(clientId);
    if (!chat) throw new Error('Chat not found');

    return chat;
  }

  async create(newChat: INewClientChat) {
    if (!newChat.chatbotPublicId) throw new Error('chatbotId is required');

    const chatbot = await this.chatbotRepository.findByPublicId(
      newChat.chatbotPublicId,
    );
    if (!chatbot) throw new Error('Chatbot not found');

    return this.chatRepository.create(uuidv4(), ChatStatus.BOT, chatbot.id);
  }
}
