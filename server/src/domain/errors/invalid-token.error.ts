import ErrorCode from "../enums/error-code.enums.ts";
import { AppError } from "./app.errors.js";

export class InvalidTokenError extends AppError {
  constructor(message = "Invalid token") {
    super(message, ErrorCode.INVALID_TOKEN, 401);
  }
}