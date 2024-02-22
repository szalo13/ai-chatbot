import { useEffect } from "react";
import { useWebSocket } from "../../../web-socket/useWebSockets";
import { IChatbotModel, ModelWebSocketSubscribeEvent } from "../model.model";

interface ITrained {
  model: IChatbotModel;
}

interface IProps {
  onTrained: (data: ITrained) => void;
}

export const useModelTrainedSubscriber = ({ onTrained }: IProps) => {
  const ws = useWebSocket();

  useEffect(() => {
    const unsubscribe = ws.subscribe(
      ModelWebSocketSubscribeEvent.ModelTrained,
      onTrained
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {};
};
