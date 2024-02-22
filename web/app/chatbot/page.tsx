"use client";

import { useEffect } from "react";
import { useChatbotList } from "../../modules/chatbot/hooks/useChatbotList";
import CreateNewChatbotSectionComponent from "./components/CreateNewChatbotSection.component";
import { useRouter } from "next/navigation";
import { useChatbotRoutes } from "../../modules/chatbot/hooks/useChatbotRoutes";
import { IChatbot } from "../../modules/chatbot/chatbot.model";

const ChatbotPage = () => {
  const chatbotRoutes = useChatbotRoutes();
  const { chatbots, fetchChatbots, loaded } = useChatbotList();
  const router = useRouter();

  useEffect(() => {
    fetchChatbots();
  }, []);

  const handleChatbotCreated = (chatbot: IChatbot) => {
    chatbotRoutes.goToEdit(chatbot.publicId);
  };

  useEffect(() => {
    if (chatbots.length) {
      router.push(`/chatbot/${chatbots[0].publicId}`);
    }
  }, [chatbots, router]);

  return (
    <div>
      {loaded && !chatbots.length && (
        <CreateNewChatbotSectionComponent onCreate={handleChatbotCreated} />
      )}
      {loaded &&
        chatbots.length &&
        chatbots.map((chatbot) => (
          <div key={chatbot.publicId}>{chatbot.name}</div>
        ))}
    </div>
  );
};

export default ChatbotPage;
