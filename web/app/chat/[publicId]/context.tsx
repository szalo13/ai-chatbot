"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { IChat } from "../../../modules/chat/chat.model";
import { useParams } from "next/navigation";
import { useChatRequests } from "../../../modules/chat/hooks/useChatRequests";
import { useChatMessagesRequests } from "../../../modules/chat/hooks/useChatMessagesRequests";
import { IMessage } from "../../../modules/chat/message/message.model";
import { useRefWithPrevious } from "../../../hooks/useRefWithPrevious";

interface IChatMessagePageContext {
  chat?: IChat;
  messages: IMessage[];
}

export const ChatMessagePageContext = createContext<IChatMessagePageContext>({
  chat: undefined,
  messages: [],
});

export const ChatMessagePageProvider = ({ children }: any) => {
  const [initialized, previousInitialized] = useRefWithPrevious(false);
  const chatReq = useChatRequests();
  const chatMessageReq = useChatMessagesRequests();
  const [chat, setChat] = useState<IChat>();
  const params = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (params?.publicId) {
        const [chatRes, messageRes] = await Promise.all([
          chatReq.get(params.publicId as string),
          chatMessageReq.getMany(params.publicId as string),
        ]);
        setChat(chatRes.data);
        setMessages(messageRes.data);
      }
    };

    if (params?.publicId && !initialized.current) {
      initialized.current = true;
      loadData();
    }
  }, [params, chatMessageReq, chatReq, setChat, initialized]);

  return (
    <ChatMessagePageContext.Provider value={{ chat, messages }}>
      {children}
    </ChatMessagePageContext.Provider>
  );
};

export const useChatMessagePage = () => {
  const ctx = useContext(ChatMessagePageContext);
  if (!ctx) throw new Error("useChatPage must be used within ChatPageProvider");

  return {
    chat: ctx.chat,
    messages: ctx.messages,
  };
};
