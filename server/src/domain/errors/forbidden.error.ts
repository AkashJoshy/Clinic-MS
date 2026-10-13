import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.js";

export class ForbiddenError extends AppError {
  constructor(message: string = "You do not have permission") {
    super(message, ErrorCode.FORBIDDEN, 403);
  }
}
