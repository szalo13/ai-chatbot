import { memo } from "react";
import { useChatbotChatWindow } from "./useChatbotChatWindow";
import ChatWindow from "./ChatWindow/ChatWindow";
import { useModelRequests } from "../../../../modules/chatbot/model/hooks/useModelRequests";

interface IChatbotChatWindowPropTypes {
  modelPublicId: string;
}

const BOT_IMG =
  "https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png";
const PERSON_IMG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const ChatbotChatWindow = ({ modelPublicId }: IChatbotChatWindowPropTypes) => {
  const chatbotReq = useModelRequests();
  const { responding, messages, addMessage, setResponding } =
    useChatbotChatWindow();

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

  return (
    <ChatWindow
      responding={responding}
      messages={messages}
      onSubmit={handleSubmit}
    />
  );
};

export default memo(ChatbotChatWindow);
