import { memo, useState } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import Message from "./components/Message";

interface IMessage {
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
    <div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-full bg-white">
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {messages.map((message) => (
            <Message key={message.text} {...message} />
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
          className="block border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(ChatWindow);
