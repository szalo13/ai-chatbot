import { IsString, IsEnum, validateOrReject } from 'class-validator';
import { Transform, plainToClass } from 'class-transformer';
import {
  ChatMessageClientView,
  IMessageClientView,
} from './message/message.client.model';
import { ChatStatus } from '../chat.model';

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

export interface IClientChatView {
  clientId: string;
  status: ChatStatus;
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

    const [messages, chatbot] = await Promise.all([
      await Promise.all([
        ...this.messages.map(async (msg) => msg.toValidatedView()),
      ]),
      await plainToClass(ClientChatbotView, this.chatbot).toValidatedView(),
    ]);

    return {
      clientId: this.clientId,
      status: this.status,
      messages,
      chatbot,
    };
  }
}
