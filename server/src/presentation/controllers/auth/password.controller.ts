import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IForgotPasswordUseCase } from "../../../application/interfaces/repositories/auth/i-forgot-password.usecase.ts";
import type { IResetPasswordUseCase } from "../../../application/interfaces/repositories/auth/i-reset-password.usecase.ts";
import type { IChangePasswordUseCase } from "../../../application/interfaces/repositories/auth/i-change-password.usecase.ts";
import type User from "../../../domain/entities/user.entity.ts";

export class PasswordController {
  constructor(
    private readonly _forgotPasswordUseCase: IForgotPasswordUseCase,
    private readonly _forgotDoctorPasswordUseCase: IForgotPasswordUseCase,
    private readonly _forgotAdminPasswordUseCase: IForgotPasswordUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    private readonly _resetDoctorPasswordUseCase: IResetPasswordUseCase,
    private readonly _resetAdminPasswordUseCase: IResetPasswordUseCase,
    private readonly _changeDoctorPasswordUseCase: IChangePasswordUseCase,
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

  async forgotDoctorPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this._forgotDoctorPasswordUseCase.execute(req.body);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.PASSWORD_RESET_LINK,
      });
    } catch (error) {
      return next(error);
    }
  }

  async forgotAdminPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this._forgotAdminPasswordUseCase.execute(req.body);

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

  async resetDoctorPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password, role } = req.body;
      await this._resetDoctorPasswordUseCase.execute({ token, password, role });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: "Your password has been reset successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  async resetAdminPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password, role } = req.body;
      await this._resetAdminPasswordUseCase.execute({ token, password, role });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: "Your password has been reset successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  async changeDoctorPassword(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.userId
      userId = Array.isArray(userId) ? userId[0] : userId

      const { currentPassword, newPassword } = req.body;
      await this._changeDoctorPasswordUseCase.execute({
        userId: userId!,
        currentPassword,
        newPassword,
      });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: "Your password has been changed successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
}
