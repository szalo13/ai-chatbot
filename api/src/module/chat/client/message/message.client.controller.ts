import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessageClientService } from './message.client.service';

@Controller('/chat/client/:clientId/message')
export class MessageClientController {
  constructor(private readonly messageClientService: MessageClientService) {}

  @Post('/')
  createMessage(
    @Body() message: any,
    @Param('clientId') clientId: string,
  ): Promise<any> {
    return this.messageClientService.create(clientId, message);
  }
}
