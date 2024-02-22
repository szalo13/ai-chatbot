import { AxiosResponse } from "axios";
import {
  IDataSource,
  IDataSourceType,
  INewDataSource,
} from "../datasource.model";
import { API_URL } from "../../../../../const/api";
import { useAuthorizedRequest } from "../../../../auth/useAuthorizedRequest";

interface ICreateDataSourceResult {
  dataSource: IDataSource;
  uploadUrl: string;
}

interface IDataSourceUpdate {
  text?: string;
}

export interface IDataSourceRequests {
  create: (
    modelPublicId: string,
    newDataSource: INewDataSource
  ) => Promise<AxiosResponse<ICreateDataSourceResult>>;
  update: (
    dataSourcePublicId: string,
    type: IDataSourceType,
    data: IDataSourceUpdate
  ) => Promise<AxiosResponse<IDataSource>>;
}

export const useDatasourceRequests = () => {
  const authRequest = useAuthorizedRequest();

  const create = (
    modelPublicId: string,
    newDataSource: INewDataSource
  ): Promise<AxiosResponse<ICreateDataSourceResult>> => {
    return authRequest.post(
      `${API_URL}/model/${modelPublicId}/datasource`,
      newDataSource
    );
  };

  const update = (
    dataSourcePublicId: string,
    type: IDataSourceType,
    data: IDataSourceUpdate
  ): Promise<AxiosResponse<IDataSource>> => {
    return authRequest.put(
      `${API_URL}/datasource/${dataSourcePublicId}?type=${type}`,
      data
    );
  };

  return {
    create,
    update,
  } as IDataSourceRequests;
};
