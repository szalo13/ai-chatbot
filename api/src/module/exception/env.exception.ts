export class EnvMissingException extends Error {
  constructor(name: string) {
    super(`Env variable missing from config {name=${name}}`);
  }
}
