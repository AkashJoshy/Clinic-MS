import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IVerifyEmailUseCase } from "../../../application/interfaces/repositories/auth/i-verify-email.usecase.ts";
import type { IResendOtpUseCase } from "../../../application/interfaces/repositories/auth/i-resend-otp.usecase.ts";

export class EmailVerificationController {
  constructor(
    private readonly _verifyEmail: IVerifyEmailUseCase,
    private readonly _resendOtp: IResendOtpUseCase,
  ) {}

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.body;
      let result = await this._verifyEmail.execute(data);
      if (!result) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
        });
      }
      return res.status(ResponseStatusCode.ACCEPTED).json({
        success: true,
        message: RESPONSE_MESSAGE.OTP_ACCOUNT_VERIFIED,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this._resendOtp.execute(data);
      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.OTP_RESENT,
      });
    } catch (error: any) {
      return next(error.message);
    }
  }
}
