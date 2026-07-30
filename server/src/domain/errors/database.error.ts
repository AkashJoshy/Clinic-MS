import { AppError } from "./app.errors.js";

export class DatabaseError extends AppError {
  constructor(message: string = "Operation failed") {
    super(message, "DATABASE_ERROR", 500);
  }
}