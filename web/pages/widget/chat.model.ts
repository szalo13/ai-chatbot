export enum MessageSenderType {
  BOT = "bot",
  CLIENT = "client",
  MEMBER = "member",
}

export interface IChlientChatbotModelView {
  publicId: string;
}

export interface IClientChatbotView {
  publicId: string;
  model: IChlientChatbotModelView;
}

export interface IMessageClientView {
  publicId: string;
  content: string;
  senderType: MessageSenderType;
  createdAt: string;
}

export interface IClientChatView {
  clientId: string;
  status: string;
  messages: IMessageClientView[];
  chatbot: {
    publicId: string;
  };
}
