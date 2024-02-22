import { requiredEnv } from '../../shared/config';

export interface ModelConfig {
  trainLambdaName: string;
  queryModelLambdaName: string;
  modelSQSQueueUrl: string;
}

export default () => ({
  model: {
    trainLambdaName: requiredEnv('MODEL_TRAIN_LAMBDA_NAME'),
    queryModelLambdaName: requiredEnv('MODEL_QUERY_LAMBDA_NAME'),
    modelSQSQueueUrl: requiredEnv('CHATBOT_SQS_BUS_URL'),
  } as ModelConfig,
});
