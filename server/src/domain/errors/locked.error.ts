import ErrorCode from "../enums/error-code.enums.ts";
import { AppError } from "./app.errors.js";

export class LockedError extends AppError {
  constructor(message: string = "Your account is temporarily unavailable") {
    super(message, ErrorCode.ACCOUNT_LOCKED, 423);
  }
}