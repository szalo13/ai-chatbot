import { IsString, IsEnum, validateOrReject } from 'class-validator';
import { Transform, plainToClass } from 'class-transformer';

export interface INewClientChat {
  chatbotPublicId: string;
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
  senderType: string;
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

export class ClientChatbotModelView {
  @IsString()
  publicId: string;

  async toValidatedView(): Promise<IChlientChatbotModelView> {
    await validateOrReject(this);
    return {
      publicId: this.publicId,
    };
  }
}

export class ClientChatbotView {
  @IsString()
  publicId: string;

  @Transform(({ value }) => plainToClass(ClientChatbotModelView, value))
  model: ClientChatbotModelView;

  async toValidatedView(): Promise<IClientChatbotView> {
    await validateOrReject(this);
    return {
      publicId: this.publicId,
      model: await plainToClass(
        ClientChatbotModelView,
        this.model,
      ).toValidatedView(),
    };
  }
}

export class ChatMessageClientView {
  @IsString()
  publicId: string;

  @IsString()
  content: string;

  @IsEnum(['BOT', 'HUMAN'])
  senderType: string;

  @IsString()
  createdAt: string;

  async toValidatedView(): Promise<IMessageClientView> {
    await validateOrReject(this);
    return {
      publicId: this.publicId,
      content: this.content,
      senderType: this.senderType,
      createdAt: this.createdAt,
    };
  }
}

export class ClientChatView {
  @IsString()
  clientId: string;

  @Transform(({ value }) => value.toString())
  @IsEnum(['BOT', 'HUMAN'])
  status: string;

  @Transform(({ value }) => plainToClass(ClientChatbotView, value))
  chatbot: ClientChatbotView;

  @Transform(({ value }) => {
    return value.map((msg) => plainToClass(ChatMessageClientView, msg));
  })
  messages: ChatMessageClientView[];

  async toValidatedView(): Promise<IClientChatView> {
    await validateOrReject(this);
    return {
      clientId: this.clientId,
      status: this.status,
      messages: await this.messages.map((msg) => msg.toValidatedView()),
      chatbot: await plainToClass(
        ClientChatbotView,
        this.chatbot,
      ).toValidatedView(),
    };
  }
}
