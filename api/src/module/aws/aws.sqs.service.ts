import { Injectable, Logger } from '@nestjs/common';
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  ReceiveMessageCommandOutput,
  DeleteMessageCommandOutput,
} from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '../../app.config';

@Injectable()
export class AwsSqsService {
  private readonly logger = new Logger(AwsSqsService.name);
  private sqsClient: SQSClient;
  protected readonly appConfig: GlobalConfig;

  constructor(private readonly configService: ConfigService) {
    this.appConfig = this.configService.get('global');
    this.sqsClient = new SQSClient({
      region: this.appConfig.awsRegion,
    });
  }

  async pollQueue(
    queueUrl: string,
    maxMessages = 10,
    waitTimeSeconds = 20,
  ): Promise<ReceiveMessageCommandOutput> {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: maxMessages,
      WaitTimeSeconds: waitTimeSeconds,
    };
    return await this.sqsClient.send(new ReceiveMessageCommand(params));
  }

  async deleteMessage(
    queueUrl: string,
    receiptHandle: string,
  ): Promise<DeleteMessageCommandOutput> {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };
    return this.sqsClient.send(new DeleteMessageCommand(params));
  }
}
