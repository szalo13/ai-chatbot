import { API_URL } from "../../../const/api";

const CLIENT_ID_KEY_NAME = "lra:chatbot-client-id";

export const useChatbot = () => {
  const getClientId = () => {
    return localStorage.getItem(CLIENT_ID_KEY_NAME);
  };

  const setClientId = (clientId: string) => {
    localStorage.setItem(CLIENT_ID_KEY_NAME, clientId);
  };

  const createChat = (chatbotPublicId: string) => {
    return fetch(`${API_URL}/chat/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatbotPublicId }),
    });
  };

  const getChat = (clientId: string) => {
    return fetch(`${API_URL}/chat/client/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const sendMessage = (clientId: string, message: string) => {
    return fetch(`${API_URL}/chat/client/${clientId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
  };

  const getOrCreateChat = async (chatbotPublicId: string) => {
    let clientId = getClientId();
    if (!clientId) {
      const response = await createChat(chatbotPublicId);
      const chat = await response.json();
      clientId = chat.clientId as string;

      if (clientId) setClientId(clientId);
      return chat;
    }

    console.log("clientId", clientId);
    const res = await getChat(clientId);
    const chat = res.json();
    return chat;
  };

  return {
    getOrCreateChat,
    createChat,
    getChat,
    sendMessage,
  };
};
