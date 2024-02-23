"use client";

import { useEffect } from "react";
import { useChatbotPage } from "./context";
import { useChatbotRoutes } from "../../../modules/chatbot/hooks/useChatbotRoutes";
import { IModelStatus } from "../../../modules/chatbot/model/model.model";
import ChatbotChatWindowComponent from "./ChatbotChat/ChatbotChat.component";
import { PrimaryButton } from "../../../components/layouts/MainLayoutTemplate/atoms/Button";

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

  return (
    <div>
      <PrimaryButton onClick={() => chatbotRoutes.goToEdit(chatbot.publicId)}>
        Go to Edit
      </PrimaryButton>
      <div className="h-96 bg-gray-50 sm:p-4 rounded-md mt-4">
        <ChatbotChatWindowComponent modelPublicId={chatbot.model.publicId} />
      </div>
    </div>
  );
};

export default ChatbotPage;
