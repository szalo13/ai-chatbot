import { BadRequestException, Injectable } from '@nestjs/common';
import { ModelService } from '../../chatbot/model/model.service';
import { ChatStatus } from '../../chat/chat.model';
import { MessageService } from '../../message/message.service';
import { MessageSenderType } from '../../message/message.model';
import {
  CreateMessageResponse,
  IMessageCreateResponse,
} from './message.client.model';
import { plainToClass } from 'class-transformer';
import { ChatService } from '../../chat/chat.service';

@Injectable()
export class MessageClientService {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly modelService: ModelService,
  ) {}

  private async createEscalatedMessage(
    chatId: number,
    message: string,
  ): Promise<IMessageCreateResponse> {
    const createdMessage = await this.messageService.create(
      message,
      chatId,
      MessageSenderType.CLIENT,
    );

    return plainToClass(CreateMessageResponse, {
      originalMessage: createdMessage,
      responseMessage: null,
    }).toValidatedView();
  }

  private async createBotMessage(
    chatId: number,
    modelPublicId: string,
    message: string,
  ): Promise<IMessageCreateResponse> {
    const [originalMessage, botResponse] = await Promise.all([
      this.messageService.create(message, chatId, MessageSenderType.CLIENT),
      await this.modelService.askQuestion(modelPublicId, message),
    ]);
    const responseMessage = await this.messageService.create(
      botResponse.answear,
      chatId,
      MessageSenderType.BOT,
    );

    return plainToClass(CreateMessageResponse, {
      originalMessage,
      responseMessage,
    }).toValidatedView();
  }

  async create(
    clientId: string,
    message: string,
  ): Promise<IMessageCreateResponse> {
    if (!clientId) throw new BadRequestException('clientId is required');
    if (!message) throw new BadRequestException('message is required');

    const chat = await this.chatService.findByClientIdWithChatbotAndModel(
      clientId,
    );
    if (!chat) throw new Error('Chat not found');

    if (chat.status === ChatStatus.BOT) {
      return this.createBotMessage(
        chat.id,
        chat.chatbot.model.publicId,
        message,
      );
    }

    return this.createEscalatedMessage(chat.id, message);
  }
}
