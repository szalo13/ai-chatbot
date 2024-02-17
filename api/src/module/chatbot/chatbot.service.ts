import { Injectable } from '@nestjs/common';
import { IModelStatus, INewChatbot } from './chatbot.model';
import { ChatbotRepository } from './chatbot.repository';

@Injectable()
export class ChatbotService {
  constructor(private readonly chatbotRepository: ChatbotRepository) {}

  create(data: INewChatbot) {
    const defaultData = {
      status: IModelStatus.notTrained,
    };
    return this.chatbotRepository.create({ ...defaultData, ...data });
  }

  findByPublicId(publicId: string) {
    return this.chatbotRepository.findByPublicId(publicId);
  }

  findMany() {
    return this.chatbotRepository.findMany();
  }
}
