import { memo, useState } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import Message from "./components/Message";
import SendIcon from "./components/SendIcon.svg";

interface IMessage {
  id: string;
  text: string;
  type: "owner" | "responder";
  imgSrc: string;
}

interface IChatbotWindowPropTypes {
  responding?: boolean;
  messages: IMessage[];
  onSubmit: (message: string) => void;
}

const ChatWindow = ({
  responding,
  messages,
  onSubmit,
}: IChatbotWindowPropTypes) => {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    onSubmit(inputValue);
    setInputValue("");
  };

  const hanldeFormSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex-1 justify-between flex flex-col h-full w-full">
      <div
        id="messages"
        className="flex flex-col space-y-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
        <div>
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
              {responding && <LoadingIndicator />}
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={hanldeFormSubmit}
        className="block border-t-2 border-gray-200 pt-4 sm:mb-0"
      >
        <div className="relative flex">
          <input
            type="text"
            placeholder="Say something..."
            autoComplete="off"
            autoFocus={true}
            className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2"
            x-ref="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
            <button
              onClick={handleButtonClick}
              type="button"
              className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-black hover:bg-gray-800 focus:outline-none"
            >
              <div className="h-5 w-5">
                <SendIcon />
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(ChatWindow);
