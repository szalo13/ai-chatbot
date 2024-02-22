import React, { memo } from "react";

export interface ITopBarPropTypes extends React.HTMLProps<HTMLDivElement> {}

const TopBar = ({ children, ...others }: ITopBarPropTypes) => {
  return (
    <div
      className="h-14 px-6 flex border-b border-gray-200 w-full bg-white align-center"
      {...others}
    >
      {children}
    </div>
  );
};

export default memo(TopBar);
