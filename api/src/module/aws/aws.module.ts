import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsS3Service } from './aws.s3.service';
import appConfig from '../../app.config';
import { AwsLambdaService } from './aws.lambda.service';
import { AwsSqsService } from './aws.sqs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  providers: [AwsS3Service, AwsLambdaService, AwsSqsService],
  exports: [AwsS3Service, AwsLambdaService, AwsSqsService],
})
export class AwsModule {}
