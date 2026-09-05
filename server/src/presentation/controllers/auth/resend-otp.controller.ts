import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IResendOtpUseCase } from "../../../application/repositories/auth/i-resend-otp.usecase.ts";

export class ResendOtpController {
  constructor(private _resendOtp: IResendOtpUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
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
