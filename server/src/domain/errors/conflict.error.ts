import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.ts";

export class ConflictError extends AppError {
  constructor(message: string = "Resource already exists") {
    super(message, ErrorCode.CONFLICT, 409);
  }
}
