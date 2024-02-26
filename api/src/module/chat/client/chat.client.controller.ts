import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IClientChatView, INewClientChat } from './chat.client.model';
import { ChatClientService } from './chat.client.service';

@Controller('/chat/client')
export class ChatClientController {
  constructor(private readonly chatClientService: ChatClientService) {}

  @Post('/')
  createChat(@Body() newChat: INewClientChat): Promise<IClientChatView> {
    return this.chatClientService.create(newChat);
  }

  @Get('/:clientId')
  findByClientId(
    @Param('clientId') clientId: string,
  ): Promise<IClientChatView> {
    return this.chatClientService.findByClientId(clientId);
  }
}
