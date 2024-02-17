import { useAuthorizedRequest } from "../../auth/useAuthorizedRequest";
import { API_URL } from "../../../const/api";

export const useChatbotRequests = () => {
  const authRequest = useAuthorizedRequest();

  const create = async (name: string) => {
    authRequest.post(`${API_URL}/chatbot`, { name });
  };

  const get = async (publicId: string) => {
    return authRequest.get(`${API_URL}/chatbot/${publicId}`);
  };

  return { create, get };
};
