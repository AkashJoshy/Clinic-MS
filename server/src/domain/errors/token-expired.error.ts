import { AppError } from "./app.errors.js";

export class TokenExpiredAppError extends AppError {
  constructor() {
    super("Token Expires", "TOKEN_EXPIRED", 401);
  }
}