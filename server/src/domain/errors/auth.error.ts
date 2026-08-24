import { AppError } from "./app.errors.js";
import ErrorCode from "../enums/error-code.enums.ts"

export class AuthError extends AppError {
  constructor(message: string = "You must be logged in") {
    super(message, ErrorCode.UNAUTHORIZED, 401);
  }
}
