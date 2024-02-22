import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth0Strategy } from './auth0/auth0.strategy';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PassportModule.register({ session: true }), UserModule],
  providers: [
    AuthService,
    Auth0Strategy,
    JwtStrategy,
    JwtService,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
