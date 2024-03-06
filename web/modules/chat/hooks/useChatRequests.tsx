import { useAuthorizedRequest } from "../../auth/useAuthorizedRequest";
import { API_URL } from "../../../const/api";
import { AxiosResponse } from "axios";
import { IChat, IChatListElement } from "../chat.model";

const CHAT_URL = `${API_URL}/chat`;

export const useChatRequests = () => {
  const authRequest = useAuthorizedRequest();

  const getList = async (): Promise<AxiosResponse<IChatListElement[]>> => {
    return authRequest.get(`${CHAT_URL}`);
  };

  const get = async (publicId: string): Promise<AxiosResponse<IChat>> => {
    return authRequest.get(`${CHAT_URL}/${publicId}`);
  };

  return { get, getList };
};
