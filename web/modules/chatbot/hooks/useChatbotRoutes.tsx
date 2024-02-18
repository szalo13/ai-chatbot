"use client";

import { useRouter } from "next/navigation";

export const useChatbotRoutes = () => {
  const router = useRouter();

  const goToList = () => {
    router.push("/chatbot");
  };

  const goToEdit = (publicId: string) => {
    router.push(`/chatbot/${publicId}/edit`);
  };

  const goToDetails = (publicId: string) => {
    router.push(`/chatbot/${publicId}`);
  };

  return { goToEdit, goToDetails, goToList };
};
