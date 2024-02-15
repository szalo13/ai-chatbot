"use client";

import { useEffect } from "react";
import { useChatbotList } from "../../modules/chatbot/hooks/useChatbotList";
import ChatbotListElement from "../../modules/chatbot/components/ChatbotListElement";

const ChatbotPage = () => {
  const { chatbots, fetchChatbots } = useChatbotList();

  useEffect(() => {
    fetchChatbots();
  }, []);

  return (
    <div>
      {chatbots.map((chatbot: any) => (
        <ChatbotListElement
          key={chatbot.id}
          name={chatbot.name}
          description={"none"}
        />
      ))}
    </div>
  );
};

export default ChatbotPage;
