import { useState } from "react";
import { useModelRequests } from "../../../../modules/chatbot/model/hooks/useModelRequests";

interface IMessage {
  text: string;
  type: "owner" | "responder";
  imgSrc: string;
}

export interface IUseChatbotChatProps {
  modelPublicId: string;
}

const BOT_IMG =
  "https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png";
const PERSON_IMG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

export const useChatbotChat = ({ modelPublicId }: IUseChatbotChatProps) => {
  const chatbotReq = useModelRequests();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [responding, setResponding] = useState(false);

  const addMessage = (message: IMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSubmit = async (msg: string) => {
    setResponding(true);
    addMessage({ text: msg, type: "owner", imgSrc: PERSON_IMG });
    try {
      const res = await chatbotReq.askQuestion(modelPublicId, msg);
      addMessage({
        text: res.data.answear,
        type: "responder",
        imgSrc: BOT_IMG,
      });
    } catch (error) {
      addMessage({
        text: "Sorry, I can't answer that right now",
        type: "responder",
        imgSrc: BOT_IMG,
      });
    }
    setResponding(false);
  };

  return {
    messages,
    responding,
    addMessage,
    handleSubmit,
  };
};
