import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IForgotPasswordUseCase } from "../../../application/repositories/auth/IForgotPasswordUseCase.ts";

export class ForgotPasswordController {
  constructor(private readonly forgotPasswordUseCase: IForgotPasswordUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await this.forgotPasswordUseCase.execute(email);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: "Password reset link has been sent to your email",
      });
    } catch (error) {
      return next(error);
    }
  }
}
