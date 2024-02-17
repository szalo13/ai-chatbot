import { EnvMissingException } from '../exception/env.exception';

export const requiredEnv = (name: string) => {
  const env = process.env[name];
  if (env === undefined) {
    throw new EnvMissingException(name);
  }
  return env;
};
