import ErrorCode from "../enums/error-code.enums.ts";
import { AppError } from "./app.errors.js";

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, ErrorCode.INTERNAL_SERVER_ERROR, 500);
  }
}