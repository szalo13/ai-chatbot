export enum MessageSenderType {
  BOT = "BOT",
  CLIENT = "CLIENT",
  MEMBER = "MEMBER",
}

export interface IMessage {
  publicId: string;
  chatId: number;
  content: string;
  createdAt: string;
  senderType: MessageSenderType;
}
