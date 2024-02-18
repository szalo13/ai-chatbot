import { memo } from "react";

interface ILoadingIndicatorPropTypes {}

const LoadingIndicator = ({}: ILoadingIndicatorPropTypes) => {
  return (
    <div className="loading-indicator">
      <img
        src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
        alt="..."
        className="w-16 ml-6"
      />
    </div>
  );
};

export default memo(LoadingIndicator);
