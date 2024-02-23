import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { INewOrganization } from './organization.model';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async create(data: INewOrganization) {
    return this.organizationRepository.create(data);
  }

  async findOneByEmail(publicId: string) {
    return this.organizationRepository.findOneByPublicId(publicId);
  }
}
