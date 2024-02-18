import { API_URL } from "../../../../const/api";
import { useAuthorizedRequest } from "../../../auth/useAuthorizedRequest";

const MODEL_URL = `${API_URL}/model`;

export const useModelRequests = () => {
  const authRequest = useAuthorizedRequest();

  const train = async (publicId: string) => {
    authRequest.post(`${MODEL_URL}/${publicId}/train`, {});
  };

  return { train };
};
