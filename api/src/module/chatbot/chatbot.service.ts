import { Injectable } from '@nestjs/common';
import { INewChatbot } from './chatbot.model';
import { ChatbotRepository } from './chatbot.repository';

@Injectable()
export class ChatbotService {
  constructor(private readonly chatbotRepository: ChatbotRepository) {}

  create(data: INewChatbot) {
    return this.chatbotRepository.create(data);
  }

  findByPublicId(publicId: string) {
    return this.chatbotRepository.findByPublicId(publicId);
  }
}
