"use client";

import { useEffect } from "react";
import { useChatbotList } from "../../modules/chatbot/hooks/useChatbotList";
import CreateNewChatbotSectionComponent from "./components/CreateNewChatbotSection.component";
import { useRouter } from "next/navigation";

const ChatbotPage = () => {
  const { chatbots, fetchChatbots, loaded } = useChatbotList();
  const router = useRouter();

  useEffect(() => {
    fetchChatbots();
  }, []);

  useEffect(() => {
    if (chatbots.length) {
      router.push(`/chatbot/${chatbots[0].publicId}`);
    }
  }, [chatbots, router]);

  return (
    <div>
      {loaded && !chatbots.length && (
        <CreateNewChatbotSectionComponent onCreate={fetchChatbots} />
      )}
    </div>
  );
};

export default ChatbotPage;
