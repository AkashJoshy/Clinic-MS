import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.ts";

export class ResourceError extends AppError {
  constructor(message: string) {
    super(message, ErrorCode.NOT_FOUND, 404);
  }
}