import { Module } from '@nestjs/common';
import { DBModule } from '../../db/db.module';
import { OrganizationService } from './organization.service';
import { OrganizationRepository } from './organization.repository';

@Module({
  imports: [DBModule],
  exports: [OrganizationService],
  providers: [OrganizationService, OrganizationRepository],
})
export class OrganizationModule {}
