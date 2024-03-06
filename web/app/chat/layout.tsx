"use client";

import MainLayoutTemplate from "../../components/layouts/MainLayoutTemplate";
import { useChatRoutes } from "../../modules/chat/hooks/useChatRoutes";
import ChatListElement from "./components/ChatListElement/ChatListElement";
import { ChatListPageProvider, useChatListPage } from "./context";

const withProviders = (WrappedComponent: any) => {
  const WithProviders = (props: any) => {
    return (
      <ChatListPageProvider>
        <WrappedComponent {...props} />
      </ChatListPageProvider>
    );
  };

  return WithProviders;
};

const ChatbotModulePageLayout = ({ children }: any) => {
  const { chats } = useChatListPage();
  const chatRoutes = useChatRoutes();

  return (
    <MainLayoutTemplate>
      <div className="w-full h-full grid-cols-3 grid">
        <div className="col-span-1 border-r border-gray-100 h-full">
          {chats.map((chat) => (
            <div key={chat.publicId} className="p-2">
              <ChatListElement
                chat={chat}
                onClick={() => chatRoutes.goToChat(chat.publicId)}
              />
            </div>
          ))}
        </div>
        <div className="col-span-2 h-full">{children}</div>
      </div>
    </MainLayoutTemplate>
  );
};

export default withProviders(ChatbotModulePageLayout);
