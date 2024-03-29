import { Injectable } from '@nestjs/common';
import { ChatClientRepository } from './chat.client.repository';
import {
  ClientChatView,
  IClientChatView,
  INewClientChat,
} from './chat.client.model';
import { ChatStatus } from '../chat/chat.model';
import { v4 as uuidv4 } from 'uuid';
import { ChatbotService } from '../chatbot/chatbot.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ChatClientService {
  constructor(
    private readonly chatRepository: ChatClientRepository,
    private readonly chatbotService: ChatbotService,
  ) {}

  async findByClientId(clientId: string): Promise<IClientChatView> {
    if (!clientId) throw new Error('clientId is required');

    const chat = await this.chatRepository.findByClientIdForClientView(
      clientId,
    );

    if (!chat) throw new Error('Chat not found');

    return plainToClass(ClientChatView, chat).toValidatedView();
  }

  async create(chatInput: INewClientChat): Promise<IClientChatView> {
    if (!chatInput.chatbotPublicId) throw new Error('chatbotId is required');

    const chatbot = await this.chatbotService.findByPublicId(
      chatInput.chatbotPublicId,
    );
    if (!chatbot) throw new Error('Chatbot not found');

    const newChatEntity =
      await this.chatRepository.createAndReturnForClientView(
        uuidv4(),
        ChatStatus.BOT,
        chatbot.id,
        chatbot.organizationId,
      );
    return plainToClass(ClientChatView, newChatEntity).toValidatedView();
  }
}
