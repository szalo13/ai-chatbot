export enum IModelStatus {
  NotTrained = 'notTrained',
  AwaitingTraining = 'awaitingTraining',
  DuringTraining = 'duringTraining',
  Created = 'created',
  Failed = 'failed',
}

export interface ITrainModelFile {
  path: string;
}

export interface ITrainModelBody {
  modelId: number;
  modelPublicId: string;
  modelOutputPath: string;
  bucket: string;
  files: ITrainModelFile[];
}

export interface ITrainModelResult {
  success: boolean;
  error?: string;
  body: ITrainModelBody;
}

export interface IQueryModelPayload {
  bucket: string;
  modelId: string;
  query: string;
}