import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessageClientService } from './message.client.service';

interface ICreateMessage {
  message: string;
}

@Controller('/chat/client/:clientId/message')
export class MessageClientController {
  constructor(private readonly messageClientService: MessageClientService) {}

  @Post('/')
  createMessage(
    @Body() body: ICreateMessage,
    @Param('clientId') clientId: string,
  ): Promise<any> {
    return this.messageClientService.create(clientId, body.message);
  }
}
