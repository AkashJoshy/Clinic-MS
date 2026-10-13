import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.js";

export class InvalidEmailError extends AppError {
  constructor(message = "Invalid email format") {
    super(message, ErrorCode.INVALID_EMAIL, 400);
  }
}
