"use client";

import { useEffect } from "react";
import { useChatbotPage } from "./context";
import { useChatbotRoutes } from "../../../modules/chatbot/hooks/useChatbotRoutes";
import { IModelStatus } from "../../../modules/chatbot/model/model.model";

const ChatbotPage = () => {
  const { chatbot } = useChatbotPage();
  const chatbotRoutes = useChatbotRoutes();

  useEffect(() => {
    // Change page to edit if chatbot is not trained
    if (chatbot && chatbot.model.status === IModelStatus.notTrained) {
      chatbotRoutes.goToEdit(chatbot.publicId);
    }
  }, [chatbot, chatbotRoutes]);

  return <div>chatbot page</div>;
};

export default ChatbotPage;
