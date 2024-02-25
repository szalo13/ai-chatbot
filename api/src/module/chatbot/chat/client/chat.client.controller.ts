import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { INewClientChat } from './chat.client.model';
import { ChatClientService } from './chat.client.service';

@Controller('/chat/client')
export class ChatClientController {
  constructor(private readonly chatClientService: ChatClientService) {}

  @Post('/')
  createChat(@Body() newChat: INewClientChat) {
    return this.chatClientService.create(newChat);
  }

  @Get('/:clientId')
  findByClientId(@Param('clientId') clientId: string) {
    return this.chatClientService.findByClientId(clientId);
  }
}
