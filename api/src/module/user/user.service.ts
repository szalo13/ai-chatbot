import { Injectable } from '@nestjs/common';
import { INewUser, IUserUpdate } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: INewUser) {
    return this.userRepository.create(data);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async findByAuth0Id(publicId: string) {
    return this.userRepository.findByAuth0Id(publicId);
  }

  async updateByAuth0Id(auth0Id: string, data: IUserUpdate) {
    return this.userRepository.updateByAuth0Id(auth0Id, data);
  }
}
