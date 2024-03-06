import { IDataSource } from "./datasource/datasource.model";

export enum IModelStatus {
  NOT_TRAINED = "NOT_TRAINED",
  AWAITING_TRAINING = "AWAITING_TRAINING",
  DURING_TRAINING = "DURING_TRAINING",
  CREATED = "CREATED",
  FAILED = "FAILED",
}

export interface IChatbotModel {
  publicId: string;
  status: IModelStatus;
  dataSourceAssets: IDataSource[];
}

export enum ModelWebSocketEmitEvent {
  SubscribeToModel = "model:subscribe",
}

export enum ModelWebSocketSubscribeEvent {
  ModelTrained = "model:trained",
}
