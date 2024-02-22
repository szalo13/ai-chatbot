import { useAuthorizedRequest } from "../../auth/useAuthorizedRequest";
import { API_URL } from "../../../const/api";
import { AxiosResponse } from "axios";
import { IChatbot } from "../chatbot.model";

export const useChatbotRequests = () => {
  const authRequest = useAuthorizedRequest();

  const create = async (name: string): Promise<AxiosResponse<IChatbot>> => {
    return authRequest.post(`${API_URL}/chatbot`, { name });
  };

  const getList = async (): Promise<AxiosResponse<IChatbot[]>> => {
    return authRequest.get(`${API_URL}/chatbot`);
  };

  const get = async (publicId: string): Promise<AxiosResponse<IChatbot>> => {
    return authRequest.get(`${API_URL}/chatbot/${publicId}`);
  };

  return { create, get, getList };
};
