import type { Request, Response, NextFunction } from "express";
import { AppError, toAppError } from "../../domain/errors/app.errors.js";
import { InvalidTokenError } from "../../domain/errors/invalid-token.error.js";
import { TokenExpiredAppError } from "../../domain/errors/token-expired.error.js";
import mongoose from "mongoose";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let error = toAppError(err);

  //   // Mongo Duplicate Key Error
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    error = new AppError(`${field} already exists`, "VALIDATION_ERROR", 400);
  }

  if ((err as any)?.name === "ValidationError") {
    const messages = Object.values((err as any).errors)
      .map((e: any) => e.message)
      .join(", ");

    error = new AppError(messages, "VALIDATION_ERROR", 400);
  }

  // JWT Errors
  if ((err as any)?.name === "JsonWebTokenError" || (err as any)?.message === "jwt malformed" || (err as any)?.message === "invalid signature") {
    error = new InvalidTokenError();
  }

  if ((err as any)?.name === "TokenExpiredError" || (err as any)?.message === "jwt expired" || error.message === "jwt expired") {
    error = new TokenExpiredAppError();
  }

  console.error("iERROR:", {
    path: req.originalUrl,
    method: req.method,
    message: error.message,
    code: error.code,
    stack: err instanceof Error ? err.stack : undefined,
  });

  return res.status(error.statusCode || 500).json({
    success: false,
    code: error.code,
    message: error.message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err instanceof Error ? err.stack : undefined,
    }),
  });
};
