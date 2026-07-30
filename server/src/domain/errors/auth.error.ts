import { AppError } from "./app.errors.js";

export class AuthError extends AppError {
  constructor(message: string = "You must be logged in") {
    super(message, "UNAUTHORIZED", 401);
  }
}
