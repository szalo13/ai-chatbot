import { AxiosResponse } from "axios";
import { IDataSource, INewDataSource } from "../datasource.model";
import { API_URL } from "../../../../../const/api";
import { useAuthorizedRequest } from "../../../../auth/useAuthorizedRequest";

interface ICreateDataSourceResult {
  dataSource: IDataSource;
  uploadUrl: string;
}

export interface IDataSourceRequests {
  create: (
    modelPublicId: string,
    newDataSource: INewDataSource
  ) => Promise<AxiosResponse<ICreateDataSourceResult>>;
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

  return {
    create,
  } as IDataSourceRequests;
};
