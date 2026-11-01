import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IForgotPasswordUseCase } from "../../../application/interfaces/repositories/auth/i-forgot-password.usecase.ts";
import type { IResetPasswordUseCase } from "../../../application/interfaces/repositories/auth/i-reset-password.usecase.ts";

export class PasswordController {
  constructor(
    private readonly _forgotPasswordUseCase: IForgotPasswordUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
  ) {}

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this._forgotPasswordUseCase.execute(req.body);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.PASSWORD_RESET_LINK,
      });
    } catch (error) {
      return next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
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
