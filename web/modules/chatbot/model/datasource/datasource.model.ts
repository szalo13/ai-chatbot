export interface INewDataSource {
  fileName: string;
  type: IDataSourceType;
}

export enum IDataSourceType {
  Text = "text",
  Pdf = "pdf",
}

export interface IDataSource {
  publicId: string;
  type: IDataSourceType;
  fileName: string;
  fileSize: number;
  updatedAt: string;
  createdAt: string;
}