export type IDataSourceType = 'TEXT' | 'PDF';

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
  transcriptCreated: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface INewDataDTO {
  name?: string;
  fileName: string;
  type: IDataSourceType;
}
