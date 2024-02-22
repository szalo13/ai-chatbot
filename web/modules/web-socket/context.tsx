import { createContext, useCallback, useRef } from "react";
import { API_URL } from "../../const/api";
import io from "socket.io-client";

interface IWebSocketContext {
  subscribe: (eventName: string, callback: Callback) => () => void;
  emit: (eventName: string, data: any) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const WebSocketContext = createContext<IWebSocketContext>(
  {} as IWebSocketContext
);

const socket = io(API_URL);

type Callback = (data: any) => void;
type Subscriber = { eventName: string; callback: Function };
type Subscribers = Subscriber[];

export const WebSocketProvider = ({ children }: ProviderProps) => {
  const subscribers = useRef<Subscribers>([]);

  const subscribe = useCallback((eventName: string, callback: Callback) => {
    socket.on(eventName, callback);
    subscribers.current = [...subscribers.current, { eventName, callback }];

    return () => {
      socket.off(eventName, callback);
      subscribers.current = subscribers.current?.filter(
        (sub) => sub.callback !== callback
      );
    };
  }, []);

  const emit = (eventName: string, data: any) => {
    socket.emit(eventName, data);
  };

  return (
    <WebSocketContext.Provider value={{ subscribe, emit }}>
      {children}
    </WebSocketContext.Provider>
  );
};
