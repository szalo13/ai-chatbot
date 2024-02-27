import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useRequest from "../../../../hooks/useRequest";
import { useGetOrCreateChat } from "../../hooks/useGetOrCreateChat";
import { IClientChatView } from "../../chat.model";
import { useChatMessage } from "../../hooks/useChatMessage";

export type ChatWidgetContextType = {
  chat?: IClientChatView;
  loading: boolean;
  loaded: boolean;
  setChat: (chat: IClientChatView) => void;
};

/**
 * Context
 */
const ChatWidgetContext = createContext<ChatWidgetContextType>({
  chat: undefined,
  loading: false,
  loaded: false,
  setChat: () => {},
});

/**
 * Provider
 */
export const ChatWidgetProvider = ({ children }: any) => {
  const { loading, loaded, sendRequest } = useRequest();
  const [chat, setChat] = useState<IClientChatView>();
  const location = useParams();
  const chatbotPublicId = location?.id as string;
  const { getOrCreateChat } = useGetOrCreateChat();

  useEffect(() => {
    const getChatbot = async (chatbotPublicId: string) => {
      const chat = await sendRequest(getOrCreateChat(chatbotPublicId));
      setChat(chat);
    };

    if (!chatbotPublicId || loaded) return;
    getChatbot(chatbotPublicId);
  }, [chatbotPublicId, getOrCreateChat, loaded, sendRequest]);

  return (
    <ChatWidgetContext.Provider value={{ chat, loading, loaded, setChat }}>
      {children}
    </ChatWidgetContext.Provider>
  );
};

/**
 * Main hook
 */
export const useChatWidget = () => {
  const ctx = useContext(ChatWidgetContext);
  const message = useChatMessage();
  const { chat, loading, loaded, setChat } = ctx;

  const createMessage = async (messageText: string) => {
    if (!chat) return;
    const newMsg = await message.sendMessage(chat.clientId, messageText);

    if (newMsg) {
      setChat({
        ...chat,
        messages: [...chat.messages, newMsg],
      });
    }
  };

  return {
    chat,
    messages: chat?.messages || [],
    loading,
    loaded,
    createMessage,
  };
};
