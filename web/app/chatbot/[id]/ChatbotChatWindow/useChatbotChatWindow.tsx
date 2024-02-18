import { useState } from "react";

interface IMessage {
  text: string;
  type: "owner" | "responder";
  imgSrc: string;
}

export const useChatbotChatWindow = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [responding, setResponding] = useState(false);

  const addMessage = (message: IMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  return {
    messages,
    responding,
    setResponding,
    addMessage,
  };
};
