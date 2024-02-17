import { Button } from "@material-tailwind/react";
import { memo } from "react";
import { useChatbotRequests } from "../../../modules/chatbot/hooks/useChatbotRequests";

interface ICreateNewChatbotPropTypes {
  onCreate: () => void;
}

const CreateNewChatbot = ({ onCreate }: ICreateNewChatbotPropTypes) => {
  const chatbot = useChatbotRequests();

  const createChatbot = async () => {
    await chatbot.create("Default chatbot");
    onCreate();
  };

  return (
    <div className="create-new-chatbot-section">
      <h3 className="title">Create new chatbot</h3>
      <Button
        variant="filled"
        color="blue"
        placeholder="Create"
        onClick={createChatbot}
      >
        Create
      </Button>
    </div>
  );
};

export default memo(CreateNewChatbot);
