import ErrorCode from "../enums/error-code.enums.ts";
import { AppError } from "./app.errors.js";

export class InvalidCredentialsError extends AppError {
  constructor(message: string = "Invalid Credentials") {
    super(message, ErrorCode.UNAUTHORIZED, 401);
  }
}
