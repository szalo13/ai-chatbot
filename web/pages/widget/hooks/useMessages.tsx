import { useMemo, useState } from "react";
import { IMessage, IMessageClientView, MessageSenderType } from "../chat.model";
import { useChatMessagesRequests } from "./useChatMessagesRequests";
import { useChat } from "./useChat";

interface IMessagesManagerProps {
  chatbotPublicId: string;
  initialMessages: IMessageClientView[];
}

export const useMessagesManager = ({
  chatbotPublicId,
  initialMessages,
}: IMessagesManagerProps) => {
  const chatUtils = useChat();
  const [loading, setLoading] = useState(false);
  const messageReq = useChatMessagesRequests();
  const [messages, _setMessages] = useState<IMessage[]>(
    initialMessages.map((msg) => ({
      ...msg,
      createdAtBackend: true,
    }))
  );

  const createMessage = async (text: string) => {
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

    setLoading(true);
    const response = await messageReq.sendMessage(clientId, text);
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
    setLoading(false);
  };

  return {
    messages,
    loading,
    createMessage,
  };
};
