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

export interface IClientChatView {
  status: string;
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
  @Transform(({ value }) => value.toString())
  @IsEnum(['BOT', 'HUMAN'])
  status: string;

  @Transform(({ value }) => plainToClass(ClientChatbotView, value))
  chatbot: ClientChatbotView;

  async toValidatedView(): Promise<IClientChatView> {
    await validateOrReject(this);
    return {
      status: this.status,
      chatbot: await plainToClass(
        ClientChatbotView,
        this.chatbot,
      ).toValidatedView(),
    };
  }
}
