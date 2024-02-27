export enum MessageSenderType {
  BOT = "BOT",
  CLIENT = "CLIENT",
  MEMBER = "MEMBER",
}

export enum ChatStatus {}

export interface IChlientChatbotModelView {
  publicId: string;
}

export interface IClientChatbotView {
  publicId: string;
  model: IChlientChatbotModelView;
}

export interface IMessageCreateResponse {
  responseMessage: IMessageClientView | null;
  originalMessage: IMessageClientView | null;
}

export interface IMessageClientView {
  publicId: string;
  content: string;
  senderType: MessageSenderType;
  createdAt: string;
}

export interface IMessage extends IMessageClientView {
  createdAtBackend: boolean;
}

export interface IClientChatView {
  clientId: string;
  status: string;
  messages: IMessageClientView[];
  chatbot: {
    publicId: string;
  };
}
