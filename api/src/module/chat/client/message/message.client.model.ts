import { IsEnum, IsString, validateOrReject } from 'class-validator';
import { MessageSenderType } from '../../message/message.model';
import { Transform, plainToClass } from 'class-transformer';

export interface IMessageClientView {
  publicId: string;
  content: string;
  senderType: MessageSenderType;
  createdAt: string;
}

export interface IMessageCreateResponse {
  responseMessage: IMessageClientView | null;
  originalMessage: IMessageClientView | null;
}

export class ChatMessageClientView {
  @IsString()
  publicId: string;

  @IsString()
  content: string;

  @IsEnum(Object.entries(MessageSenderType))
  senderType: MessageSenderType;

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

export class CreateMessageResponse {
  @Transform(({ value }) =>
    value ? plainToClass(ChatMessageClientView, value) : null,
  )
  responseMessage: ChatMessageClientView | null;

  @Transform(({ value }) =>
    value ? plainToClass(ChatMessageClientView, value) : null,
  )
  originalMessage: ChatMessageClientView;

  async toValidatedView(): Promise<IMessageCreateResponse> {
    await validateOrReject(this);
    return {
      responseMessage: this.responseMessage
        ? await this.responseMessage.toValidatedView()
        : null,
      originalMessage: await this.originalMessage.toValidatedView(),
    };
  }
}
