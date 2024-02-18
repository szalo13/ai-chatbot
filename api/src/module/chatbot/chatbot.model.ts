import { ModelStatus } from '@prisma/client';

export interface INewChatbot {
  name: string;
  status: ModelStatus;
}

export interface IChatbot {
  id: number;
  name: string;
}
