import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";

interface IModelWebSocketInput {
  children: React.ReactNode;
  trigger: string;
  emitEvents: EmitEvent[];
}

interface ModelWebSocket {
  children: React.ReactNode;
  subscribe: (eventName: EventName, callback: Function) => () => void;
  unsubscribe: (eventName: EventName, callback: Function) => void;
}

interface EmitEvent {
  eventName: string;
  data: any;
}

interface ModelWebSocketContextGenerator {
  subscribeEventNames: string[];
  url: string;
}

type EventName = string;
type Subscriber = { eventName: string; callback: Function };
type Subscribers = Subscriber[];

export const createWebSocketContext = ({
  subscribeEventNames,
  url,
}: ModelWebSocketContextGenerator) => {
  const Context = createContext<ModelWebSocket | null>({});
  const socket = io(url);

  return {
    Context: Context,
    Provider: ({ children, trigger, emitEvents }: IModelWebSocketInput) => {
      const prevTrigger = useRef<string | null>(null);
      const [subscribers, setSubscribers] = useState<Subscribers>([]);

      // Function to register callbacks
      const subscribe = useCallback((eventName: string, callback: Function) => {
        setSubscribers((prevSubscribers) => [
          ...prevSubscribers,
          { eventName, callback },
        ]);
        return () => {
          setSubscribers((prevSubscribers) =>
            prevSubscribers.filter((sub) => sub.callback !== callback)
          );
        };
      }, []);

      const unsubscribe = useCallback(
        (eventName: string, callback: Function) => {
          setSubscribers((prevSubscribers) =>
            prevSubscribers.filter(
              (sub) => sub.eventName === eventName && sub.callback === callback
            )
          );
        },
        []
      );

      useEffect(() => {
        const init = async () => {
          // Connect to the websocket
          emitEvents.forEach((event: EmitEvent) => {
            socket.emit(event.eventName, event.data);
          });

          subscribeEventNames.forEach((eventName: EventName) => {
            socket.on(eventName, (data: any) => {
              subscribers.forEach((sub) => {
                if (sub.eventName === eventName) {
                  sub.callback(data);
                }
              });
            });
          });
        };

        const deactive = async () => {
          emitEvents.forEach((event: EmitEvent) => {
            socket.off(event.eventName);
          });
          subscribeEventNames.forEach((eventName: EventName) => {
            socket.off(eventName);
          });
        };

        if (trigger !== prevTrigger.current || !prevTrigger.current) {
          prevTrigger.current = trigger;
          deactive();
          init();
        }

        return () => {
          deactive();
        };
      }, [trigger, subscribers, emitEvents]);

      return (
        <Context.Provider value={{ children, subscribe, unsubscribe }}>
          {children}
        </Context.Provider>
      );
    },
    useWebSocket: () => {
      const context = useContext(Context);
      if (!context) {
        throw new Error(
          "useWebSocket must be used within a WebSocketContextProvider"
        );
      }

      return context;
    },
  };
};
