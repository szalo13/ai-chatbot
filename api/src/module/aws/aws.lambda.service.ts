import { Injectable, Logger } from '@nestjs/common';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '../../app.config';

@Injectable()
export class AwsLambdaService {
  protected readonly logger: Logger = new Logger(AwsLambdaService.name);
  protected readonly lambdaClient: LambdaClient;
  protected readonly appConfig: GlobalConfig;

  constructor(protected readonly configService: ConfigService) {
    this.appConfig = this.configService.get('global');

    this.lambdaClient = new LambdaClient({
      region: this.appConfig.awsRegion,
    });
  }

  async invokeLambda(functionName: string, payload: any): Promise<any> {
    try {
      const command = new InvokeCommand({
        FunctionName: functionName,
        Payload: JSON.stringify({ body: JSON.stringify(payload) }),
      });
      const res = await this.lambdaClient.send(command);
      const { Payload } = res;
      const result = await new Uint8Array(Payload as ArrayBuffer);
      const statusCode = res.$metadata.httpStatusCode;

      return { result, statusCode, rawRes: res };
    } catch (error) {
      this.logger.error(
        `Error invoking lambda: ${error.message}, ${JSON.stringify({
          payload,
        })}`,
      );
      throw error;
    }
  }
}
