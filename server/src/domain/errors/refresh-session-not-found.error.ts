import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.js";

export class RefreshSessionNotFoundError extends AppError {
  constructor(message: string = "Token Expires") {
    super(message, ErrorCode.REFRESH_SESSION_NOT_FOUND, 401);
  }
}
