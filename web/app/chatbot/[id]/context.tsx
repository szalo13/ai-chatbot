"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IChatbot } from "../../../modules/chatbot/chatbot.model";
import { useChatbotRequests } from "../../../modules/chatbot/hooks/useChatbotRequests";
import useRequest from "../../../hooks/useRequest";
import { useParams } from "next/navigation";

interface ChatbotPageContextType {}

const ChatbotPageContext = createContext<ChatbotPageContextType | undefined>(
  undefined
);

export const ChatbotPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ChatbotPageContext.Provider value={{}}>
      {children}
    </ChatbotPageContext.Provider>
  );
};

/**
 * Custom hook to use the chatbot page context
 */
export const useChatbotPage = () => {
  const initialized = useRef(false);
  const context = useContext(ChatbotPageContext);
  if (context === undefined) {
    throw new Error("useChatbotPage must be used within a ChatbotPageContext");
  }

  const params = useParams();
  const chatbotReq = useChatbotRequests();
  const [chatbot, setChatbot] = useState<IChatbot | null>(null);
  const { loading, loaded, sendRequest } = useRequest();

  const fetch = useCallback(
    async (publicId: string) => {
      const res = await sendRequest(chatbotReq.get(publicId));
      if (res) {
        setChatbot(res.data);
      }
    },
    [chatbotReq, sendRequest, setChatbot]
  );

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    fetch(params.id as string);
  }, [fetch, params.id]);

  return {
    chatbot,
    loading,
    loaded,
    fetch,
  };
};
