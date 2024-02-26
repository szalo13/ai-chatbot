import { memo } from "react";
import "./BaseLayout.css";

const BaseLayout = ({ children }: any) => {
  return <div className="base-layout">{children}</div>;
};

export default memo(BaseLayout);
