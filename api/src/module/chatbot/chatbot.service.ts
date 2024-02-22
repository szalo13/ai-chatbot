import { Injectable } from '@nestjs/common';
import { INewChatbot } from './chatbot.model';
import { ChatbotRepository } from './chatbot.repository';
import { ModelStatus } from '@prisma/client';

@Injectable()
export class ChatbotService {
  constructor(private readonly chatbotRepository: ChatbotRepository) {}

  create(data: INewChatbot) {
    const defaultData = {
      status: ModelStatus.notTrained,
    };
    return this.chatbotRepository.create({ ...defaultData, ...data });
  }

  findByPublicId(publicId: string) {
    return this.chatbotRepository.findByPublicId(publicId);
  }

  findManyByUserId() {
    // return this.chatbotRepository.findMany();
  }
}
