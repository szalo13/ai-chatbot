import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsS3Service } from './aws.s3.service';
import appConfig from '../../app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  providers: [AwsS3Service],
  exports: [AwsS3Service],
})
export class AwsModule {}
