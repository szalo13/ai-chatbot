import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AwsSqsService } from '../../../aws/aws.sqs.service';
import { ConfigService } from '@nestjs/config';
import { ModelConfig } from '../model.config';
import { Message } from '@aws-sdk/client-sqs';
import { ModelSQSHandlerFactory } from './handler/factory';

@Injectable()
export class ModelSqsCronService {
  private readonly modelConfig: ModelConfig;
  private readonly logger = new Logger(ModelSqsCronService.name);

  constructor(
    private readonly sqsService: AwsSqsService,
    private readonly configService: ConfigService,
    private readonly sqsHandler: ModelSQSHandlerFactory,
  ) {
    this.modelConfig = this.configService.get('model');
  }

  private async handleMessage(message: Message): Promise<void> {
    const body = JSON.parse(message.Body);
    const { eventName } = body;
    this.logger.log(`Handling event: ${body.eventName}, {${message.Body}}`);

    await this.sqsHandler.handle(eventName, body);
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
