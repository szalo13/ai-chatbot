// src/chatbot/chatbot.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/db.service';

@Injectable()
export class ChatbotRepository {
  constructor(private prisma: PrismaService) {}
}
