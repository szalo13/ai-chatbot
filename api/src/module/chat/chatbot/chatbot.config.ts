import { requiredEnv } from '../../shared/config';

export interface ChatbotConfig {
  awsRegion: string;
  uploadBucket: string;
  modelStatusQueueUrl: string;
  processingQueueUrl: string;
  cjisProcessingQueueUrl: string;
  previewLinkExpiresIn: number;
}

export default () => ({
  chatbot: {
    uploadBucket: requiredEnv('UPLOAD_BUCKET'),
    awsRegion: process.env.AWS_REGION || 'eu-central-1',
  } as ChatbotConfig,
});
