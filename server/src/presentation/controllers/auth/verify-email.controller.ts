import type { NextFunction, Request, Response } from "express";
import type { VerifyOtpRequest } from "../../../types/user.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IVerifyEmailUseCase } from "../../../application/repositories/auth/i-verify-email.usecase.ts";

export class VerifyEmailController {
  constructor(private _verifyEmail: IVerifyEmailUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
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
}
