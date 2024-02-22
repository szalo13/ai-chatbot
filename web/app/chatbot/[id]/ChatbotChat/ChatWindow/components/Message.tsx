import classNames from "classnames";
import { memo } from "react";

interface IMessagePropTypes {
  text: string;
  type: "owner" | "responder";
  imgSrc: string;
}

const Message = ({ text, type, imgSrc }: IMessagePropTypes) => {
  return (
    <div className="message">
      <div
        className={classNames([
          "flex items-end",
          {
            ["justify-end"]: type === "owner",
          },
        ])}
      >
        <div
          className={classNames([
            "flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 rounded-xl",
            { ["bg-gray-50"]: type === "responder" },
            { ["bg-black text-white"]: type === "owner" },
          ])}
        >
          <div>
            <span className="px-4 py-3 rounded-xl inline-block">{text}</span>
          </div>
        </div>
        <img src={imgSrc} alt="" className="w-6 h-6 rounded-full" />
      </div>
    </div>
  );
};

export default memo(Message);
