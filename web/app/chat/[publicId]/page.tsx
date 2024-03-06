"use client";

import { memo } from "react";
import { useChatMessagePage } from "./context";
import ChatWindow from "../../chatbot/[id]/ChatbotChat/ChatWindow/ChatWindow";
import { MessageSenderType } from "../../../modules/chat/message/message.model";

interface IPagePropTypes {}

const mapMessageType = (type: MessageSenderType) => {
  switch (type) {
    case MessageSenderType.CLIENT:
      return "owner";
    default:
      return "responder";
  }
};

const ChatDetailsPage = ({}: IPagePropTypes) => {
  const chatMessage = useChatMessagePage();

  const handleSubmit = () => {};

  return (
    <ChatWindow
      hideInput
      messages={chatMessage.messages.map((message) => ({
        text: message.content,
        type: mapMessageType(message.senderType),
        imgSrc: "",
      }))}
      onSubmit={handleSubmit}
    ></ChatWindow>
  );
};

export default memo(ChatDetailsPage);
