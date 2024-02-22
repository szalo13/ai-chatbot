import { Strategy } from 'passport-auth0';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

interface ValidateResult {
  accessToken: string;
  profile: any;
}

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor() {
    super({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: 'openid profile email',
    });
  }

  async validate(
    accessToken,
    refreshToken,
    extraParams,
    profile,
    done,
  ): Promise<ValidateResult> {
    return done(null, { profile });
  }
}
