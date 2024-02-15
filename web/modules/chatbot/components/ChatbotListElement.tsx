import Image from "next/image";
import { memo } from "react";

interface IChatbotListElementPropTypes {
  name: string;
  description: string;
}

const ChatbotListElement = ({
  name,
  description,
}: IChatbotListElementPropTypes) => {
  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
};

export default memo(ChatbotListElement);
