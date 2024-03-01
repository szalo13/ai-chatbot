import { useState } from "react";
import { IMessage, IMessageClientView } from "../chat.widget.model";
import { useChatMessagesRequests } from "./useChatMessagesRequests";
import { useChat } from "./useChat";
import { MessageSenderType } from "../../../modules/chat/message/message.model";

interface IMessagesManagerProps {
  initialMessages: IMessageClientView[];
}

export const useMessagesManager = ({
  initialMessages,
}: IMessagesManagerProps) => {
  const chatUtils = useChat();
  const [responding, setResponding] = useState(false);
  const messageReq = useChatMessagesRequests();
  const [messages, _setMessages] = useState<IMessage[]>(
    initialMessages.map((msg) => ({
      ...msg,
      createdAtBackend: true,
    }))
  );

  const createMessage = async (text: string) => {
    setResponding(true);
    _setMessages((prev) => [
      ...prev,
      {
        createdAtBackend: false,
        publicId: Math.random().toString(),
        content: text,
        senderType: MessageSenderType.CLIENT,
        createdAt: new Date().toISOString(),
      },
    ]);

    const clientId = chatUtils.getClientId();
    if (!clientId) return;

    const response = await messageReq.sendMessage(clientId, text);
    setResponding(false);

    if (!response) return;

    _setMessages((prev) => {
      const newMessages = [...prev];
      newMessages.map((msg) => {
        if (
          !msg.createdAtBackend &&
          response.originalMessage?.content === msg.content
        ) {
          return { ...msg, createdAtBackend: true };
        }
      });
      if (response.responseMessage) {
        newMessages.push({
          ...response.responseMessage,
          createdAtBackend: true,
        });
      }

      return newMessages;
    });
  };

  return {
    messages,
    responding,
    createMessage,
  };
};
