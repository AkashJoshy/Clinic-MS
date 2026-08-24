import ErrorCode from "../enums/error-code.enums.ts";
import { AppError } from "./app.errors.js";

export class DatabaseError extends AppError {
  constructor(message: string = "Operation failed") {
    super(message, ErrorCode.DATABASE_ERROR, 500);
  }
}