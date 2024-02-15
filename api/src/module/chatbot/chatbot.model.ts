export enum IModelStatus {
  AwaitingTraining = 'awaitingTraining',
  Pending = 'pending',
  Created = 'created',
  Failed = 'failed',
}

export interface INewChatbot {
  name: string;
  status: IModelStatus;
}

export interface IChatbot {
  id: number;
  name: string;
}