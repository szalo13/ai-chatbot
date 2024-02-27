"use client";

import ChatWidgetLayout from "./layout/ChatWidgetLayout";
import ChatWindow from "./ChatWindow/ChatWindow";
import { ChatWidgetProvider, useChatWidget } from "./context";
import { MessageSenderType } from "../../chat.model";
import { useMessagesManager } from "../../hooks/useMessages";

const withLoadedChat = (Component: React.FC) => {
  const WithLoadedChatComponent = () => {
    const widget = useChatWidget();

    if (widget.loading) {
      return <div>Loading...</div>;
    }

    if (!widget.chat) {
      return <div>Chat not found</div>;
    }

    return <Component />;
  };

  return WithLoadedChatComponent;
};

const withLayoutAndProviders = (Component: React.FC) => {
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
    case MessageSenderType.CLIENT:
      return "owner";
    default:
      return "responder";
  }
};

const ChatWidget = () => {
  const widget = useChatWidget();
  const msgManager = useMessagesManager({
    chatbotPublicId: widget.chatbotPublicId,
    initialMessages: widget.messages,
  });

  return (
    <ChatWindow
      onSubmit={msgManager.createMessage}
      messages={msgManager.messages.map((msg) => ({
        id: msg.publicId,
        text: msg.content,
        type: mapMessageType(msg.senderType),
        createdAt: msg.createdAt,
        imgSrc: "",
      }))}
    />
  );
};

export default withLayoutAndProviders(withLoadedChat(ChatWidget));
