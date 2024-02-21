import { createContext } from "react";
import { API_URL } from "../../const/api";
import io from "socket.io-client";

interface IWebSocketContext {}

interface ProviderProps {
  children: React.ReactNode;
}

export const WebSocketContext = createContext<IWebSocketContext>(
  {} as IWebSocketContext
);

const socket = io(API_URL);

export const WebSocketProvider = ({ children }: ProviderProps) => {
  return (
    <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
  );
};
