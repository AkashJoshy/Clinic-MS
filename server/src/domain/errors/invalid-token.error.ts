import { AppError } from "./app.errors.js";

export class InvalidTokenError extends AppError {
  constructor() {
    super("Invalid token", "INVALID_TOKEN", 401);
  }
}