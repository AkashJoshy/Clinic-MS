import { AppError } from "./app.errors.js";

export class InvalidEmailError extends AppError {
  constructor(message: string = "Invalid Email Format") {
    super(message, "UNKNOWN_ERROR", 400)
  }
}
