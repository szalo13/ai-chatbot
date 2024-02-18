import { requiredEnv } from '../../shared/config';

export interface ModelConfig {
  trainLambdaName: string;
  queryModelLambdaName: string;
}

export default () => ({
  model: {
    trainLambdaName: requiredEnv('MODEL_TRAIN_LAMBDA_NAME'),
    queryModelLambdaName: requiredEnv('MODEL_QUERY_LAMBDA_NAME'),
  } as ModelConfig,
});
