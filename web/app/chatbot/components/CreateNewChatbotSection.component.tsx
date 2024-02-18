import { memo } from "react";
import { useChatbotRequests } from "../../../modules/chatbot/hooks/useChatbotRequests";
import { IChatbot } from "../../../modules/chatbot/chatbot.model";
import { PrimaryButton } from "../../../components/layouts/MainLayoutTemplate/atoms/Button";

interface ICreateNewChatbotPropTypes {
  onCreate: (chatbot: IChatbot) => void;
}

const CreateNewChatbot = ({ onCreate }: ICreateNewChatbotPropTypes) => {
  const chatbot = useChatbotRequests();

  const createChatbot = async () => {
    const res = await chatbot.create("Default chatbot");
    onCreate(res.data);
  };

  return (
    <div className="create-new-chatbot-section">
      <h3 className="title">Create new chatbot</h3>
      <PrimaryButton onClick={createChatbot}>Create</PrimaryButton>
    </div>
  );
};

export default memo(CreateNewChatbot);
