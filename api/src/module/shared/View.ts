export class BaseView<T> {
  data: T;

  constructor(data: T) {
    this.data = {} as T;
    Object.assign(this.data, data);
  }

  validateRequiredFields(requiredFields: any[]): void {
    for (const field of requiredFields) {
      if (this.data[field] === undefined) {
        throw new Error(`${field} is required`);
      }
    }
  }
}
