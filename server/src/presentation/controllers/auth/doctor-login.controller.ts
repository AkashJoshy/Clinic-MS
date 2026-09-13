import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IDoctorLoginUseCase } from "../../../application/repositories/auth/i-doctor-login.usecase.ts";

export class DoctorLoginController {
  constructor(private readonly _doctorLogin: IDoctorLoginUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this._doctorLogin.execute(data);

      if (result === "PENDING") {
        return res.status(ResponseStatusCode.FORBIDDEN).json({
        success: false,
        message: RESPONSE_MESSAGE.DOCTOR_PENDING,
        data: {
          status: result
        },
      });
    } else if (result === "REJECTED") {
      return res.status(ResponseStatusCode.FORBIDDEN).json({
        success: false,
        message: RESPONSE_MESSAGE.DOCTOR_REJECTED,
        data: {
          status: result
        },
      });
      } else if ("token" in result) {
        return res.status(ResponseStatusCode.OK).json({
          success: true,
          message: RESPONSE_MESSAGE.OTP_EMAIL_MESSAGE,
          data: result,
        });
      }

      const { tokenPair, role, user, message } = result;

      const { access, refresh } = tokenPair;

      res.cookie("doctorRefreshToken", refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const updatedData = {
        role,
        user,
        message,
        accessToken: access,
      };

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.ACCOUNT_AUTHENTICATED,
        data: updatedData,
      });
    } catch (error) {
      return next(error);
    }
  }
}
