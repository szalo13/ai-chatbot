"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IChatbot } from "../../../modules/chatbot/chatbot.model";
import { useChatbotRequests } from "../../../modules/chatbot/hooks/useChatbotRequests";
import useRequest from "../../../hooks/useRequest";
import { useParams } from "next/navigation";
import {
  IDataSource,
  IDataSourceType,
} from "../../../modules/chatbot/model/datasource/datasource.model";
import { useChatbotRoutes } from "../../../modules/chatbot/hooks/useChatbotRoutes";
import { useModelTrainedSubscriber } from "../../../modules/chatbot/model/hooks/useModelTrainedSubscriber";
import { useModelWebSocket } from "../../../modules/chatbot/model/hooks/useModelWebSocket";
import { IModelStatus } from "../../../modules/chatbot/model/model.model";

interface ChatbotPageContextType {
  loading: boolean;
  loaded: boolean;
  chatbot: IChatbot | null;
  setChatbot: (chatbot: IChatbot) => void;
  setModelStatus: (status: IModelStatus) => void;
}

const ChatbotPageContext = createContext<ChatbotPageContextType | undefined>(
  undefined
);

export const ChatbotPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialized = useRef(false);
  const params = useParams();
  const routes = useChatbotRoutes();
  const chatbotReq = useChatbotRequests();
  const [chatbot, setChatbot] = useState<IChatbot | null>(null);
  const { loading, loaded, sendRequest } = useRequest();
  const modelWS = useModelWebSocket();
  const modelPublicId = chatbot?.model.publicId || null;

  useModelTrainedSubscriber({
    onTrained: (data: any) => {
      setModelStatus(data.status as IModelStatus);
    },
  });

  const setModelStatus = (status: IModelStatus) => {
    setChatbot((prev: IChatbot | null) => {
      if (!prev) return prev;
      return { ...prev, model: { ...prev.model, status } };
    });
  };

  const fetch = useCallback(
    async (publicId: string) => {
      const res = await sendRequest(chatbotReq.get(publicId));
      if (res?.data) return setChatbot(res.data);

      routes.goToList();
    },
    [chatbotReq, sendRequest, setChatbot, routes]
  );

  useEffect(() => {
    if (modelPublicId) {
      modelWS.subscribeToModel(modelPublicId);
    }
  }, [modelPublicId, modelWS]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const chatbotId = params.id as string;
    fetch(chatbotId);
  }, [fetch, params.id, modelWS]);

  return (
    <ChatbotPageContext.Provider
      value={{ chatbot, loading, loaded, setChatbot, setModelStatus }}
    >
      {children}
    </ChatbotPageContext.Provider>
  );
};

/**
 * Custom hook to use the chatbot page context
 */
export const useChatbotPage = () => {
  const context = useContext(ChatbotPageContext);
  if (context === undefined) {
    throw new Error("useChatbotPage must be used within a ChatbotPageContext");
  }

  const { chatbot, loading, loaded, setChatbot, setModelStatus } = context;
  const dataSources = useMemo(
    () => chatbot?.model?.dataSourceAssets || [],
    [chatbot]
  );
  const groupedDataSources = useMemo(() => {
    const grouped: Record<IDataSourceType, IDataSource[]> = {
      text: [],
      pdf: [],
    };

    dataSources.forEach((dataSource) => {
      grouped[dataSource.type].push(dataSource);
    });
    return grouped;
  }, [dataSources]);

  return {
    chatbot,
    groupedDataSources,
    loading,
    loaded,
    setChatbot,
    setModelStatus,
    fetch,
  };
};
