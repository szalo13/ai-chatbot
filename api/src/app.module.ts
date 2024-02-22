import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './module/db/db.module';
import { ChatbotModule } from './module/chatbot/chatbot.module';
import * as session from 'express-session';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountModule } from './module/account/account.module';

@Module({
  imports: [DBModule, ChatbotModule, ScheduleModule.forRoot(), AccountModule],
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
