import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { INewChatbot } from './chatbot.model';
import { JwtGuard } from '../account/auth/jwt/jwt.guard';
import { GetJWTUser } from '../account/auth/jwt/get-jwt-user.decorator';
import { IUser } from '../account/user/user.model';

@Controller('/chatbot')
@UseGuards(JwtGuard)
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('/')
  create(@Body() newChatbot: INewChatbot, @GetJWTUser() user: IUser): any {
    return this.chatbotService.create(user, newChatbot);
  }

  @Get('/')
  getAll(@GetJWTUser() user): any {
    return this.chatbotService.findManyByOrganizationId(user.organization.id);
  }

  @Get('/:publicId')
  get(@Param('publicId') publicId: string): any {
    return this.chatbotService.findByPublicId(publicId);
  }
}
