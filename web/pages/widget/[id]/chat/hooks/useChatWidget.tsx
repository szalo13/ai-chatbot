import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useRequest from "../../../../../hooks/useRequest";
import { useChatbot } from "../../../hooks/useChatbot";

export const useChatWidget = () => {
  const { loading, loaded, sendRequest } = useRequest();
  const [chat, setChat] = useState();
  const location = useParams();
  const chatbotPublicId = location?.id as string;
  const { getOrCreateChat } = useChatbot();

  useEffect(() => {
    const getChatbot = async (chatbotPublicId: string) => {
      const chat = await sendRequest(getOrCreateChat(chatbotPublicId));
      setChat(chat);
    };

    if (!chatbotPublicId || loaded) return;
    getChatbot(chatbotPublicId);
  }, [chatbotPublicId, getOrCreateChat, loaded, sendRequest]);

  return {
    chat,
    loading,
    loaded,
  };
};
