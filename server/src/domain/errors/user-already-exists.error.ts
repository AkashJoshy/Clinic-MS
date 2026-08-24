import ErrorCode from "../enums/error-code.enums.ts";
import { AppError } from "./app.errors.js";

export class AlreadyExistsError extends AppError {
  constructor(message: string = "Resource already exists") {
      super(message, ErrorCode.CONFLICT, 409)
    }
}