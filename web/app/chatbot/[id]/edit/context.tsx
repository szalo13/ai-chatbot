"use client";

import { createContext, useContext, useState } from "react";
import { useChatbotPage } from "../context";
import { IModelStatus } from "../../../../modules/chatbot/model/model.model";

interface ChatbotPageContextType {}

const ChatbotEditPageContext = createContext<
  ChatbotPageContextType | undefined
>(undefined);

export const ChatbotEditPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ChatbotEditPageContext.Provider value={{}}>
      {children}
    </ChatbotEditPageContext.Provider>
  );
};

/**
 * Custom hook to use the chatbot page context
 */
export const useChatbotEditPage = () => {
  const context = useContext(ChatbotEditPageContext);
  if (context === undefined) {
    throw new Error("useChatbotPage must be used within a ChatbotPageContext");
  }

  const chatbotPage = useChatbotPage();
  const { chatbot } = chatbotPage;
  const [uploadingDatasetCount, setUploadingDatasetCount] = useState(0);

  const incrementRequestCount = (num?: number) => {
    setUploadingDatasetCount((prev) => prev + (num || 1));
  };

  const decrementRequestCount = (num?: number) => {
    setUploadingDatasetCount((prev) => prev - (num || 1));
  };

  return {
    ...chatbotPage,
    incrementRequestCount,
    decrementRequestCount,
    uploadingDatasetCount,
    uploading: uploadingDatasetCount > 0,
    canTrain:
      uploadingDatasetCount === 0 &&
      chatbot?.model.status !== IModelStatus.DURING_TRAINING,
  };
};
