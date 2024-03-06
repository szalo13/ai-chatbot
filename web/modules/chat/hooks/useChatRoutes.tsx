import { useRouter } from "next/navigation";

const CHAT_ROUTE = "/chat";

export const useChatRoutes = () => {
  const router = useRouter();

  const goToChatList = () => {
    router.push(CHAT_ROUTE);
  };

  const goToChat = (id: string) => {
    router.push(`${CHAT_ROUTE}/${id}`);
  };

  return { goToChat, goToChatList };
};
