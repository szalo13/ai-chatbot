import { API_URL } from "../../../const/api";

const CLIENT_ID_KEY_NAME = "lra:chatbot-client-id";

export const useChat = () => {
  const getClientId = () => {
    if (!localStorage) return null;
    return localStorage.getItem(CLIENT_ID_KEY_NAME);
  };

  const setClientId = (clientId: string) => {
    localStorage.setItem(CLIENT_ID_KEY_NAME, clientId);
  };

  const deleteClientId = () => {
    localStorage.removeItem(CLIENT_ID_KEY_NAME);
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

  return {
    getClientId,
    setClientId,
    deleteClientId,
    createChat,
    getChat,
  };
};
