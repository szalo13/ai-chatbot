import ChatWidgetLayout from "./layout/ChatWidgetLayout";
import { useChatWidget } from "./hooks/useChatWidget";

const ChatWidget = () => {
  const widget = useChatWidget();

  return <ChatWidgetLayout>{/* <ChatWindow /> */}</ChatWidgetLayout>;
};

export default ChatWidget;
