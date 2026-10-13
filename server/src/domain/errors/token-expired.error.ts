import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.js";

export class TokenExpiredAppError extends AppError {
  constructor(message: string = "Token Expires") {
    super(message, ErrorCode.TOKEN_EXPIRED, 401);
  }
}
