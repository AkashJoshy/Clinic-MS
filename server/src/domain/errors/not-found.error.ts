import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.js";

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, ErrorCode.NOT_FOUND, 404);
  }
}
