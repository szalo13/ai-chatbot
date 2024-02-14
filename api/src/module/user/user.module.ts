import { Module } from '@nestjs/common';
import { DBModule } from '../db/db.module';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [DBModule],
  exports: [UserService],
  providers: [UserService, UserRepository],
})
export class UserModule {}
