import { memo } from "react";
import { IChatListElement } from "../../../../modules/chat/chat.model";
import ListElement from "../ListElement/ListElement";
import { formatDistanceToNow } from "date-fns";
import { truncateText } from "../../../../helpers/string/truncateText";

interface IChatListElementPropTypes {
  chat: IChatListElement;
  onClick: () => void;
}

const ChatListElement = ({ chat, onClick }: IChatListElementPropTypes) => {
  return (
    <ListElement
      primaryText={truncateText(
        chat.messages[0] ? chat.messages[0].content : "",
        30,
        true
      )}
      secondaryText={formatDistanceToNow(chat.createdAt, { addSuffix: true })}
      onClick={onClick}
    />
  );
};

export default memo(ChatListElement);
