import { AppError } from "./app.errors.js";

export class LockedError extends AppError {
  constructor(message: string = "Your account is temporarily unavailable") {
    super(message, "LOCKED", 423);
  }
}