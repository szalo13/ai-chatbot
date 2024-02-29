import { useAuthorizedRequest } from "../../auth/useAuthorizedRequest";
import { API_URL } from "../../../const/api";
import { AxiosResponse } from "axios";
import { IChat, IChatListElement } from "../chat.model";

const CHAT_URL = `${API_URL}/chat`;

export const useChatMessagesRequests = () => {
  const authRequest = useAuthorizedRequest();

  const getMany = async (
    publicId: string
  ): Promise<AxiosResponse<IChatListElement[]>> => {
    return authRequest.get(`${CHAT_URL}/${publicId}/message`);
  };

  const create = async (
    publicId: string,
    text: string
  ): Promise<AxiosResponse<IChat>> => {
    return authRequest.post(`${CHAT_URL}/${publicId}/message`, {
      content: text,
    });
  };

  return { create, getMany };
};
