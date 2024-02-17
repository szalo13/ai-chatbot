import { IDataSource } from "./datasource/datasource.model";

export enum IModelStatus {
  notTrained = "notTrained",
  AwaitingTraining = "awaitingTraining",
  Pending = "pending",
  Created = "created",
  Failed = "failed",
}

export interface IChatbotModel {
  publicId: string;
  status: IModelStatus;
  dataSourceAssets: IDataSource[];
}
