import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth0Guard } from './auth0/auth0.guard';
import { JwtService } from '@nestjs/jwt';
import { Auth0Profile } from './auth0/auth0.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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
    const payload = { ...profile };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    this.authService.registerOrUpdateUser({
      name: profile.displayName,
      email: profile.emails[0].value,
      auth0Id: profile.user_id,
      provider: 'auth0',
      picture: profile.picture,
      locale: profile.locale,
    });

    const redirectUrl = `http://localhost:4005/login/callback?accessToken=${token}`;
    res.redirect(302, redirectUrl);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    // Implementation of logout not required for now
  }
}
