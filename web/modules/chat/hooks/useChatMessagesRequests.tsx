import { useAuthorizedRequest } from "../../auth/useAuthorizedRequest";
import { API_URL } from "../../../const/api";
import { AxiosResponse } from "axios";
import { IMessage } from "../message/message.model";

const CHAT_URL = `${API_URL}/chat`;

export const useChatMessagesRequests = () => {
  const authRequest = useAuthorizedRequest();

  const getMany = async (
    chatPublicId: string
  ): Promise<AxiosResponse<IMessage[]>> => {
    return authRequest.get(`${CHAT_URL}/${chatPublicId}/message`);
  };

  const create = async (
    chatPublicId: string,
    text: string
  ): Promise<AxiosResponse<IMessage>> => {
    return authRequest.post(`${CHAT_URL}/${chatPublicId}/message`, {
      content: text,
    });
  };

  return { create, getMany };
};
