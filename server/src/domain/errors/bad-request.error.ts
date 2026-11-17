import ErrorCode from "../enums/error-code.enum.ts";
import { AppError } from "./app.errors.js";

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request") {
    super(message, ErrorCode.BAD_REQUEST, 400);
  }
}
