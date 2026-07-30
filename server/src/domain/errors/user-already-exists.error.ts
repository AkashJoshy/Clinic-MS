import { AppError } from "./app.errors.js";

export class AlreadyExistsError extends AppError {
  constructor(message: string = "Resource already exists") {
      super(message, "CONFLICT", 409)
    }
}