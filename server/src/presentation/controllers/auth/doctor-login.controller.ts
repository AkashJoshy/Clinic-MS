import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { ILoginUseCase } from "../../../application/repositories/auth/i-login.usecase.ts";

export class DoctorLoginController {
  constructor(private readonly _doctorLogin: ILoginUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this._doctorLogin.execute(data);

      const { tokenPair, role, user, message } = result;

      const { access, refresh } = tokenPair;

      res.cookie("refreshToken", refresh, {
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
