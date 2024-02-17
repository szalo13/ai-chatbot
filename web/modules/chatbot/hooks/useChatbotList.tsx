import { useState } from "react";
import { IChatbot } from "../chatbot.model";
import { useAuthorizedRequest } from "../../auth/useAuthorizedRequest";
import { API_URL } from "../../../const/api";

export const useChatbotList = () => {
  const authRequest = useAuthorizedRequest();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatbots, setChatbots] = useState<IChatbot[]>([]);

  const fetchChatbots = async () => {
    setLoading(true);
    try {
      const res = await authRequest.get(`${API_URL}/chatbot`);
      setChatbots(res.data);
      setLoaded(true);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
    setLoading(false);
  };

  return { loading, loaded, chatbots, fetchChatbots };
};
