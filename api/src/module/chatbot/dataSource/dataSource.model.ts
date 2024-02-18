export type IDataSourceType = 'text' | 'pdf';
export interface INewDataSource {
  fileName: string;
  type: IDataSourceType;
  modelId: number;
  name: string;
}

export interface IDataSource {
  publicId: string;
  type: IDataSourceType;
  name: string;
  fileName: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface INewDataDTO {
  name?: string;
  fileName: string;
  type: IDataSourceType;
}
