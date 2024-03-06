"use client";

import { useEffect, useRef } from "react";
import { useChatListPage } from "./context";
import { useChatRoutes } from "../../modules/chat/hooks/useChatRoutes";

export const ChatPage = ({ children }: any) => {
  const initialized = useRef(false);
  const { chats } = useChatListPage();
  const chatRoutes = useChatRoutes();

  useEffect(() => {
    if (!initialized.current && chats.length) {
      chatRoutes.goToChat(chats[0].publicId);
    }
  }, [chats, chatRoutes]);

  return <></>;
};

export default ChatPage;
