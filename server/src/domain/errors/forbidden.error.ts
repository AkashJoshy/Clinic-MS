import { AppError } from "./app.errors.js";

export class ForbiddenError extends AppError {
  constructor(message: string = "You do not have permission") {
    super(message, "FORBIDDEN", 403);
  }
}