import { memo } from "react";

interface IListElementPropTypes {
  primaryText: string;
  secondaryText: string;
  onClick?: () => void;
}

const ListElement = ({
  primaryText,
  secondaryText,
  onClick,
}: IListElementPropTypes) => {
  return (
    <div
      className="list-element cursor-pointer rounded-md bg-gray-100 hover:bg-blue-100"
      onClick={onClick}
    >
      <div>{primaryText}</div>
      <div>{secondaryText}</div>
    </div>
  );
};

export default memo(ListElement);
