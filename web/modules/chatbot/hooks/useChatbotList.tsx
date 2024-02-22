import { useState } from "react";
import { IChatbot } from "../chatbot.model";
import { useAuthorizedRequest } from "../../auth/useAuthorizedRequest";
import { API_URL } from "../../../const/api";
import { useChatbotRequests } from "./useChatbotRequests";

export const useChatbotList = () => {
  const authRequest = useAuthorizedRequest();
  const chatbotReq = useChatbotRequests();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatbots, setChatbots] = useState<IChatbot[]>([]);

  const fetchChatbots = async () => {
    setLoading(true);
    try {
      const res = await chatbotReq.getList();
      setChatbots(res.data);
      setLoaded(true);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return { loading, loaded, chatbots, fetchChatbots };
};
