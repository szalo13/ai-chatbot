import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from '../../account/auth/jwt/jwt.guard';
import { GetJWTUser } from '../../account/auth/jwt/get-jwt-user.decorator';
import { User } from '@prisma/client';

@Controller('/chat')
@UseGuards(JwtGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/')
  findMany(@GetJWTUser() user?: User) {
    return this.chatService.findManyByOrganization(user);
  }
}
