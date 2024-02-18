import { requiredEnv } from '../../shared/config';

export interface ModelConfig {
  trainLambdaName: string;
}

export default () => ({
  model: {
    trainLambdaName: requiredEnv('MODEL_TRAIN_LAMBDA_NAME'),
  } as ModelConfig,
});
