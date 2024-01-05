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
