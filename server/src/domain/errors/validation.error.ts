import { AppError } from "./app.errors.js";

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed") {
    super(message, "VALIDATION_ERROR", 400);
  }
}