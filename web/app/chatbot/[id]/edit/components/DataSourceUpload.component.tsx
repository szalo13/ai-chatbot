"use client";

import axios from "axios";
import { memo, useEffect, useRef } from "react";
import {
  IDataSource,
  IDataSourceType,
} from "../../../../../modules/chatbot/model/datasource/datasource.model";
import {
  IDataSourceRequests,
  useDatasourceRequests,
} from "../../../../../modules/chatbot/model/datasource/hooks/useDatasourceRequests";
import {
  IUseRequestStatus,
  useRequestStatus,
} from "../../../../../hooks/useRequestStatus";

interface IProps {
  modelPublicId: string;
  type: IDataSourceType;
  file: File;
  onUploadSuccess: (dataSource: IDataSource) => void;
  onUploadFAILED: () => void;
}

const uploadFile = async (file: File, presignedUrl: string) => {
  const blob = new Blob([file], { type: file.type });
  await axios.put(presignedUrl, blob, {
    headers: {
      "Content-Type": file.type,
    },
  });
};

const createAndUpload = async (
  props: IProps,
  request: IUseRequestStatus,
  datasourceReq: IDataSourceRequests
) => {
  const { file, modelPublicId, type, onUploadSuccess, onUploadFAILED } = props;
  try {
    request.init();
    const { data } = await datasourceReq.create(modelPublicId, {
      fileName: file.name,
      type,
    });
    await uploadFile(file, data.uploadUrl);
    request.success();
    onUploadSuccess(data.dataSource);
  } catch (error) {
    onUploadFAILED();
    request?.fail(error);
  }
};

const DataSourceUpload = (props: IProps) => {
  const { file } = props;
  const request = useRequestStatus();
  const datasourceReq = useDatasourceRequests();

  useEffect(() => {
    if (!request.loading && !request.loaded && !request.FAILED) {
      console.log("uploading");
      createAndUpload(props, request, datasourceReq);
    }
  }, [request, props, datasourceReq]);

  return <div className="">{file.name}</div>;
};

export default memo(DataSourceUpload);
