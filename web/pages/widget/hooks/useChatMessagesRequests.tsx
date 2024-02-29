import { API_URL } from "../../../const/api";
import { IMessageCreateResponse } from "../chat.widget.model";

export const useChatMessagesRequests = () => {
  /**
   * @returns IMessageView | null - depends if the message is managed by bot or customer support
   */
  const sendMessage = async (
    clientId: string,
    message: string
  ): Promise<IMessageCreateResponse> => {
    const res = await fetch(`${API_URL}/chat/client/${clientId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const body = (await res.json()) as IMessageCreateResponse;
    return body;
  };

  return { sendMessage };
};
