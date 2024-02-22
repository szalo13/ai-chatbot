import { IDataSource } from "./datasource/datasource.model";

export enum IModelStatus {
  notTrained = "notTrained",
  AwaitingTraining = "awaitingTraining",
  DuringTraining = "duringTraining",
  Created = "created",
  Failed = "failed",
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
