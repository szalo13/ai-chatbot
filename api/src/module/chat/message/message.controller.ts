import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../account/auth/jwt/jwt.guard';
import { MessageService } from './message.service';

@Controller('/chat')
@UseGuards(JwtGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/:chatPublicId/message')
  findMany(@Param('chatPublicId') chatPublicId: string) {
    return this.messageService.findManyByChatPublicId(chatPublicId);
  }
}
