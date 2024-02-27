import { IClientChatView } from "../chat.model";
import { useChat } from "./useChat";

export const useGetOrCreateChat = () => {
  const { setClientId, getClientId, deleteClientId, createChat, getChat } =
    useChat();

  const getOrCreateChat = async (
    chatbotPublicId: string
  ): Promise<IClientChatView> => {
    let clientId = getClientId();

    if (!clientId) {
      const response = await createChat(chatbotPublicId);
      const chat = await response.json();
      clientId = chat.clientId as string;

      if (clientId) setClientId(clientId);
      return chat;
    }

    const res = await getChat(clientId);
    if (res.status === 200) {
      const chat = res.json();
      return chat;
    }

    // Handle error case
    deleteClientId();
    return getOrCreateChat(chatbotPublicId);
  };

  return { getOrCreateChat };
};
