export enum IModelStatus {
  NOT_TRAINED = 'NOT_TRAINED',
  AWAITING_TRAINING = 'AWAITING_TRAINING',
  DURING_TRAINING = 'DURING_TRAINING',
  CREATED = 'CREATED',
  FAILED = 'FAILED',
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
  modelPublicId: string;
  query: string;
}

export enum ModelWebSocketInputEvent {
  SubscribeToModel = 'model:subscribe',
}

export enum ModelWebSocketOutputEvent {
  ModelTrained = 'model:trained',
  ModelDataSourceUpdated = 'model:datasource:updated',
}