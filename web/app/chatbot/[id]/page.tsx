"use client";

import { useEffect, useState } from "react";
import { useChatbotPage } from "./context";
import { useChatbotRoutes } from "../../../modules/chatbot/hooks/useChatbotRoutes";
import { IModelStatus } from "../../../modules/chatbot/model/model.model";
import ChatbotChatWindowComponent from "./ChatbotChatWindow/ChatbotChatWindow.component";

const ChatbotPage = () => {
  const { chatbot } = useChatbotPage();
  const chatbotRoutes = useChatbotRoutes();

  useEffect(() => {
    // Change page to edit if chatbot is not trained
    if (chatbot && chatbot.model.status === IModelStatus.notTrained) {
      chatbotRoutes.goToEdit(chatbot.publicId);
    }
  }, [chatbot, chatbotRoutes]);

  if (!chatbot) return null;
  return <ChatbotChatWindowComponent modelPublicId={chatbot.model.publicId} />;
};

export default ChatbotPage;
