import { Injectable } from '@nestjs/common';
import { INewUser, IUserUpdate } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createWithOrganization(data: INewUser) {
    return this.userRepository.createWithOrganization(data);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async findByAuth0IdWithOrganization(publicId: string) {
    return this.userRepository.findByAuth0IdWithOrganization(publicId);
  }

  async updateByAuth0Id(auth0Id: string, data: IUserUpdate) {
    return this.userRepository.updateByAuth0Id(auth0Id, data);
  }
}
