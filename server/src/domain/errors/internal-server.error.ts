import { AppError } from "./app.errors.js";

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, "INTERNAL_SERVER_ERROR", 500);
  }
}