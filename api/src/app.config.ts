export interface GlobalConfig {
  stage: string;
  awsRegion: string;
  isProduction: boolean;
  isStaging: boolean;
  isPublic: boolean;
  selfUrl: string;
  appUrl: string;
}

export const CONTEXT_URL = () => process.env.CONTEXT_URL || '';

export default (): { global: GlobalConfig } => ({
  global: {
    stage: process.env.STAGE || 'dev',
    awsRegion: process.env.AWS_REGION || 'eu-central-1',
    isProduction: process.env.STAGE === 'production',
    isStaging: process.env.STAGE === 'staging',
    isPublic: ['production', 'staging'].includes(process.env.STAGE),
    selfUrl: 'http://localhost:4000',
    appUrl: 'http://localhost:4005',
  },
});
