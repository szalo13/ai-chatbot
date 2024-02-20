import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AwsSqsService } from '../../../aws/aws.sqs.service';
import { ConfigService } from '@nestjs/config';
import { ModelConfig } from '../model.config';
import { Message } from '@aws-sdk/client-sqs';

@Injectable()
export class ModelSqsCronService {
  private readonly modelConfig: ModelConfig;
  private readonly logger = new Logger(ModelSqsCronService.name);

  constructor(
    private readonly sqsService: AwsSqsService,
    private readonly configService: ConfigService,
  ) {
    this.modelConfig = this.configService.get('model');
  }

  private handleMessage(message: Message): void {
    this.logger.log(`Handling message: ${message.Body}`);

    // Process the message here...
    this.sqsService.deleteMessage(
      this.modelConfig.modelSQSQueueUrl,
      message.ReceiptHandle,
    );
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async sqsQueueCron(): Promise<void> {
    const res = await this.sqsService.pollQueue(
      this.modelConfig.modelSQSQueueUrl,
    );
    if (!res.Messages) return;

    for (const message of res.Messages) {
      this.handleMessage(message);
    }
  }

  // pollQueue method as defined earlier...
}
