// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { INewUser } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerOrUpdateUser(profile: INewUser): Promise<any> {
    // Extract relevant information from the profile
    const { name, email, auth0Id } = profile;

    // Check if the user already exists in your local database
    const user = await this.userService.findByAuth0Id(auth0Id);

    if (user) {
      // User exists, update their information if necessary
      return await this.userService.updateByAuth0Id(auth0Id, { name, email });
    } else {
      // New user, create an entry in your local database
      return await this.userService.create(profile);
    }
  }
}
