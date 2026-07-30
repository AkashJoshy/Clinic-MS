import { AppError } from "./app.errors.js";

export class InvalidCredentialsError extends AppError {
  constructor(message: string = "Invalid Credentials") {
    super(message, "UNAUTHORIZED", 401);
  }
}
