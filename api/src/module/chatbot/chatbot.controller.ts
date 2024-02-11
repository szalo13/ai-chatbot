import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { INewChatbot } from './chatbot.model';

@Controller('/chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('/')
  create(@Body() newChatbot: INewChatbot): any {
    return this.chatbotService.create(newChatbot);
  }

  @Get('/')
  getAll(): any {
    return this.chatbotService.findMany();
  }

  @Get('/:publicId')
  get(@Param('publicId') publicId: string): any {
    return this.chatbotService.findByPublicId(publicId);
  }
}
