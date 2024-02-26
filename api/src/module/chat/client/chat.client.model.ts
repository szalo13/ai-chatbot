import { BaseView } from '../../shared/View';

export interface INewClientChat {
  chatbotPublicId: string;
}

export interface IClientChatView {
  status: string;
  chatbot: {
    publicId: string;
    model: {
      publicId: string;
    };
  };
}

export class ClientChatView extends BaseView<IClientChatView> {
  constructor(data: IClientChatView) {
    super(data);

    this.validateRequiredFields([
      this.data.status,
      this.data.chatbot.publicId,
      this.data.chatbot.model.publicId,
    ]);
  }

  toView(): IClientChatView {
    return {
      status: this.data.status,
      chatbot: {
        publicId: this.data.chatbot.publicId,
        model: {
          publicId: this.data.chatbot.model.publicId,
        },
      },
    };
  }
}
