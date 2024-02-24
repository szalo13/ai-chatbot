"use client";

import { Button } from "@material-tailwind/react";
import { useModelRequests } from "../../../../modules/chatbot/model/hooks/useModelRequests";
import TextDataSourceComponent from "./components/TextDataSource.component";
import UploadSectionComponent from "./sections/UploadSection.component";
import { IModelStatus } from "../../../../modules/chatbot/model/model.model";
import { useChatbotEditPage } from "./context";

const ChatbotEditPage = () => {
  const modelReq = useModelRequests();
  const chatbotEditPage = useChatbotEditPage();
  const { chatbot, groupedDataSources, setModelStatus } = chatbotEditPage;

  if (!chatbot) return null;

  return (
    <form>
      <div className="flex flex-row justify-between items-center">
        <h1 className="title">Edit chatbot</h1>
        <Button
          color={chatbotEditPage.canTrain ? "green" : "black"}
          placeholder="Train"
          disabled={
            !chatbotEditPage.canTrain ||
            chatbot.model.status === IModelStatus.DuringTraining
          }
          onClick={async () => {
            setModelStatus(IModelStatus.DuringTraining);
            await modelReq.train(chatbot.model.publicId);
          }}
        >
          Train
        </Button>
      </div>
      <p className="description">
        Add text or pdf files and train your chatbot to answear your questions
      </p>
      {groupedDataSources.text.map((dataSource) => (
        <TextDataSourceComponent
          key={dataSource.publicId}
          dataSource={dataSource}
        />
      ))}
      <UploadSectionComponent />
    </form>
  );
};

export default ChatbotEditPage;
