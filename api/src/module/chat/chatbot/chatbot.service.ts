import { Injectable } from '@nestjs/common';
import { INewChatbot } from './chatbot.model';
import { ChatbotRepository } from './chatbot.repository';
import { ModelStatus } from '@prisma/client';
import { IUser } from '../../account/user/user.model';

@Injectable()
export class ChatbotService {
  constructor(private readonly chatbotRepository: ChatbotRepository) {}

  create(user: IUser, data: INewChatbot) {
    const defaultData = {
      status: ModelStatus.NOT_TRAINED,
    };
    return this.chatbotRepository.createWithModelAndDatasource(
      user.organization.id,
      {
        ...defaultData,
        ...data,
      },
    );
  }

  findByPublicId(publicId: string) {
    return this.chatbotRepository.findByPublicId(publicId);
  }

  findManyByOrganizationId(organizationId: number) {
    return this.chatbotRepository.findManyByOrganizationId(organizationId);
  }
}
