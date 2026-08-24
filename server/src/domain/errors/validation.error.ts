import ErrorCode from "../enums/error-code.enums.ts";
import { AppError } from "./app.errors.js";

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed") {
    super(message, ErrorCode.VALIDATION_ERROR, 400);
  }
}