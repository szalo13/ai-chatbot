import { ChatMessagePageProvider } from "./context";

export const ChatMessagePageLayout = ({ children }: any) => {
  return <ChatMessagePageProvider>{children}</ChatMessagePageProvider>;
};

export default ChatMessagePageLayout;
