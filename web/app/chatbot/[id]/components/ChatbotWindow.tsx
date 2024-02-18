import { memo } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import Message from "./components/Message";

interface IChatbotWindowPropTypes {
  responding?: boolean;
}

const ChatbotWindow = ({ responding }: IChatbotWindowPropTypes) => {
  return (
    <div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-full bg-white">
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <Message
            text="Hello, I am a chatbot. How can I help you today?"
            type="responder"
            imgSrc="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
          />
          <Message
            text="I am looking for a new car"
            type="owner"
            imgSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <Message
            text="What type of car are you looking for?"
            type="responder"
            imgSrc="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
          />
          <div>
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
                {responding && <LoadingIndicator />}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Say something..."
              autoComplete="off"
              autoFocus={true}
              className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2"
              x-ref="input"
            />
            <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
              <button
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
        </div>
      </div>
    </div>
  );
};

export default memo(ChatbotWindow);
