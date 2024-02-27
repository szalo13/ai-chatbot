import ChatWidgetLayout from "./layout/ChatWidgetLayout";
import ChatWindow from "./ChatWindow/ChatWindow";
import { ChatWidgetProvider, useChatWidget } from "./context";
import { MessageSenderType } from "../../chat.model";

const withLayout = (Component: React.FC) => {
  const WithLayoutComponent = () => (
    <ChatWidgetLayout>
      <ChatWidgetProvider>
        <Component />
      </ChatWidgetProvider>
    </ChatWidgetLayout>
  );

  return WithLayoutComponent;
};

const mapMessageType = (type: MessageSenderType) => {
  switch (type) {
    case MessageSenderType.BOT:
      return "bot";
    case MessageSenderType.CLIENT:
      return "owner";
    case MessageSenderType.MEMBER:
      return "responder";
  }
};

const ChatWidget = () => {
  const widget = useChatWidget();

  if (widget.loading) {
    return <div>Loading...</div>;
  }

  if (!widget.chat) {
    return <div>Chat not found</div>;
  }

  return (
    <ChatWindow
      onSubmit={widget.createMessage}
      messages={widget.messages.map((msg) => ({
        text: msg.content,
        type: mapMessageType(msg.senderType),
        createdAt: msg.createdAt,
        imgSrc: "",
      }))}
    />
  );
};

export default withLayout(ChatWidget);
