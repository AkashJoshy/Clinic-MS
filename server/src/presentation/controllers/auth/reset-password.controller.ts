import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IResetPasswordUseCase } from "../../../application/repositories/auth/IResetPasswordUseCase.ts";

export class ResetPasswordController {
  constructor(private readonly _resetPasswordUseCase: IResetPasswordUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password, role } = req.body;
      await this._resetPasswordUseCase.execute({ token, password, role });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: "Your password has been reset successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
}
