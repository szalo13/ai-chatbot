import { IMessage } from "../../pages/widget/chat.widget.model";

export interface IChat {
  publicId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  messages: IMessage[];
}

export interface IChatListElement {
  publicId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  messages: IMessage[];
}

export interface IChat {
  publicId: string;
  name: string;
  createdAt: string;
}
