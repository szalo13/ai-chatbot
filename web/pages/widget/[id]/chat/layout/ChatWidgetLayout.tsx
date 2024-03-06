import { ReactNode, memo } from "react";
import "./ChatWidgetLayout.css";

interface IWidgetBaseLayoutPropTypes {
  children: ReactNode;
}

const WidgetBaseLayout = ({ children }: IWidgetBaseLayoutPropTypes) => {
  return <div className="widget-base-layout w-full h-full">{children}</div>;
};

export default memo(WidgetBaseLayout);
