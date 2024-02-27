import { API_URL } from "../../../const/api";
import { IMessageClientView } from "../chat.model";

export const useChatMessage = () => {
  /**
   * @returns IMessageView | null - depends if the message is managed by bot or customer support
   */
  const sendMessage = async (
    clientId: string,
    message: string
  ): Promise<IMessageClientView | null> => {
    const res = await fetch(`${API_URL}/chat/client/${clientId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const body = (await res.json()) as IMessageClientView | null;
    if (res.status === 200 && body?.publicId) return body;

    return null;
  };

  return { sendMessage };
};
