import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.ts";

export class InsufficientBalanceError extends AppError {
  constructor(
    message: string = "Insufficient wallet balance to complete this purchase",
  ) {
    super(message, ErrorCode.BAD_REQUEST, 400);
  }
}
