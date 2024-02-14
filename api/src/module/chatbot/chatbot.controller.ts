import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { INewChatbot } from './chatbot.model';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('/chatbot')
@UseGuards(JwtGuard)
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
