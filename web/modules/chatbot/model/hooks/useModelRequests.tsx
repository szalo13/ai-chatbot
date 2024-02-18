import { AxiosResponse } from "axios";
import { API_URL } from "../../../../const/api";
import { useAuthorizedRequest } from "../../../auth/useAuthorizedRequest";

const MODEL_URL = `${API_URL}/model`;

export const useModelRequests = () => {
  const authRequest = useAuthorizedRequest();

  const train = async (publicId: string) => {
    return authRequest.post(`${MODEL_URL}/${publicId}/train`, {});
  };

  const askQuestion = async (
    publicId: string,
    message: string
  ): Promise<AxiosResponse<any>> => {
    return authRequest.get(
      `${MODEL_URL}/${publicId}/question?message=${message}`
    );
  };

  return { train, askQuestion };
};
