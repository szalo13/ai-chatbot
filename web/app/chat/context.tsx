import { createContext, useContext, useEffect, useState } from "react";
import { IChatListElement } from "../../modules/chat/chat.model";
import { useChatRequests } from "../../modules/chat/hooks/useChatRequests";
import useRequest from "../../hooks/useRequest";

interface IChatListPageContext {
  chats: IChatListElement[];
  setChats: (chats: IChatListElement[]) => void;
}

export const ChatListPageContext = createContext<IChatListPageContext>({
  chats: [],
  setChats: () => {},
});

export const ChatListPageProvider = ({ children }: any) => {
  const { loaded, loading, sendRequest } = useRequest();
  const [chats, setChats] = useState<IChatListElement[]>([]);
  const chatReq = useChatRequests();

  useEffect(() => {
    const getChats = async () => {
      const res = await sendRequest(chatReq.getList());
      setChats(res.data);
    };

    if (!loading && !loaded) {
      getChats();
    }
  }, [chatReq, loaded, loading, sendRequest]);

  return (
    <ChatListPageContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatListPageContext.Provider>
  );
};

export const useChatListPage = () => {
  const ctx = useContext(ChatListPageContext);
  if (!ctx) throw new Error("useChatPage must be used within ChatPageProvider");

  const { chats } = ctx;

  return {
    chats,
  };
};
