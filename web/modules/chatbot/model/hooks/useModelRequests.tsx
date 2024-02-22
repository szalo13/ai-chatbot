import { AxiosResponse } from "axios";
import { useAuthorizedRequest } from "../../../auth/useAuthorizedRequest";
import { MODEL_URL } from "../model.const";

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
