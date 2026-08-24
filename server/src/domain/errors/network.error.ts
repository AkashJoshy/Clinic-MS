import ErrorCode from "../enums/error-code.enums.ts";
import { AppError } from "./app.errors.js";

export class NetworkError extends AppError {
  constructor(message: string = "Network request failed") {
    super(message, ErrorCode.NETWORK_ERROR, 503);
  }
}