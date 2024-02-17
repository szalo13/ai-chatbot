import { BadRequestException, ValidationError } from "@nestjs/common";

export class ValidationException extends BadRequestException {
  constructor(validationErrors: ValidationError[]) {
    super(validationErrors);
  }

  static invalidInit(className: string) {
    const validationError = {
      target: {
        name: className,
      },
      constraints: {
        general: "Required data missing",
      },
      property: "constructor",
    } as ValidationError;

    return new ValidationException([validationError]);
  }
}
