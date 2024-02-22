"use client";

import MainLayoutTemplate from "../../components/layouts/MainLayoutTemplate";

const ChatbotModulePageLayout = ({ children }: any) => {
  return (
    <MainLayoutTemplate>
      <div className="p-4">{children}</div>
    </MainLayoutTemplate>
  );
};

export default ChatbotModulePageLayout;
