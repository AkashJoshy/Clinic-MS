import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.js";

export class RefreshTokenExpiredError extends AppError {
  constructor(message: string = "Token Expires") {
    super(message, ErrorCode.REFRESH_TOKEN_EXPIRED, 401);
  }
}
