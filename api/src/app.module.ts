import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './module/db/db.module';
import * as session from 'express-session';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountModule } from './module/account/account.module';
import { ChatbotChatModule } from './module/chat/chatbot.chat.module';

@Module({
  imports: [
    DBModule,
    ChatbotChatModule,
    ScheduleModule.forRoot(),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'your-secret',
          resave: false,
          saveUninitialized: false,
          cookie: { maxAge: 60000 },
        }),
      )
      .forRoutes('*');
  }
}
