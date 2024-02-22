import { useWebSocket } from "../../../web-socket/useWebSockets";
import { ModelWebSocketEmitEvent } from "../model.model";

export const useModelWebSocket = () => {
  const ws = useWebSocket();

  return {
    subscribeToModel: (modelPublicId: string) => {
      ws.emit(ModelWebSocketEmitEvent.SubscribeToModel, {
        modelPublicId,
      });
    },
  };
};
