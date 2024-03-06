import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth0Guard } from './auth0/auth0.guard';
import { JwtService } from '@nestjs/jwt';
import { Auth0Profile } from './auth0/auth0.model';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '../../../app.config';

@Controller('auth')
export class AuthController {
  appConfig: GlobalConfig;

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.appConfig = this.configService.get('global');
  }

  @Get('login')
  @UseGuards(Auth0Guard)
  async login() {
    // Initiates the Auth0 authentication flow. The actual authentication is handled by Auth0.
  }

  @Get('callback')
  @UseGuards(Auth0Guard)
  async callback(@Req() req, @Res() res) {
    // Handle callback and redirect to the frontend with tokens
    const profile = req.user.profile as Auth0Profile;
    const user = await this.authService.registerOrUpdateUser({
      name: profile.displayName,
      email: profile.emails[0].value,
      auth0Id: profile.user_id,
      provider: 'auth0',
      picture: profile.picture,
      locale: profile.locale,
      organization: {
        name: `${profile.displayName}'s Organization`,
      },
    });
    const token = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET_KEY,
    });

    const redirectUrl = `${this.appConfig.appUrl}/login/callback?accessToken=${token}`;
    res.redirect(302, redirectUrl);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    // Implementation of logout not required for now
  }
}
