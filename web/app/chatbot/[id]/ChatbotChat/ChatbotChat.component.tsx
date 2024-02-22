import { memo } from "react";
import { IUseChatbotChatProps, useChatbotChat } from "./useChatbotChat";
import ChatWindow from "./ChatWindow/ChatWindow";

const ChatbotChat = ({ modelPublicId }: IUseChatbotChatProps) => {
  const { responding, messages, handleSubmit } = useChatbotChat({
    modelPublicId,
  });

  return (
    <ChatWindow
      responding={responding}
      messages={messages}
      onSubmit={handleSubmit}
    />
  );
};

export default memo(ChatbotChat);
