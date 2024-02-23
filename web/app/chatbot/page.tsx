"use client";

import { useEffect } from "react";
import { useChatbotList } from "../../modules/chatbot/hooks/useChatbotList";
import CreateNewChatbotSectionComponent from "./components/CreateNewChatbotSection.component";
import { useChatbotRoutes } from "../../modules/chatbot/hooks/useChatbotRoutes";
import { IChatbot } from "../../modules/chatbot/chatbot.model";

const ChatbotPage = () => {
  const chatbotRoutes = useChatbotRoutes();
  const { chatbots, fetchChatbots, loaded } = useChatbotList();

  useEffect(() => {
    fetchChatbots();
  }, []);

  const handleChatbotCreated = (chatbot: IChatbot) => {
    chatbotRoutes.goToEdit(chatbot.publicId);
  };

  return (
    <div>
      {loaded && !chatbots.length && (
        <CreateNewChatbotSectionComponent onCreate={handleChatbotCreated} />
      )}
      {loaded &&
        !!chatbots.length &&
        chatbots.map((chatbot) => (
          <div
            key={chatbot.publicId}
            onClick={() => chatbotRoutes.goToDetails(chatbot.publicId)}
          >
            {chatbot.name}
          </div>
        ))}
    </div>
  );
};

export default ChatbotPage;
