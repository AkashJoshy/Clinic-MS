import type { ErrorCode } from "../types/error.types.js";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;

  constructor(
    message: string,
    code: ErrorCode = "UNKNOWN_ERROR",
    statusCode: number = 500
  ) {
    super(message);

    this.code = code;
    this.statusCode = statusCode;

    this.name = this.constructor.name;

    Error.captureStackTrace?.(this, this.constructor);
  }
}


export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;

  if (error instanceof Error) {
    return new AppError(error.message);
  }
  

  return new AppError("An unexpected error occurred");
}