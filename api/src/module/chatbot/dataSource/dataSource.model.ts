export type IDataSourceType = 'text' | 'pdf';
export interface INewDataSource {
  fileName: string;
  type: IDataSourceType;
  modelId: number;
}

export interface IDataSource {
  publicId: string;
  type: IDataSourceType;
  fileName: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface INewDataDTO {
  fileName: string;
  type: IDataSourceType;
}
