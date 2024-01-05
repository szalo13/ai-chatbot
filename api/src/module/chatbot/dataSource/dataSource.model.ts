export enum IDataSourceType {
  Text = 'text',
  Pdf = 'pdf',
}

export interface INewDataSource {
  fileName: string;
  type: IDataSourceType;
  modelId: number;
}

export interface INewDataDTO {
  fileName: string;
  type: IDataSourceType;
}
