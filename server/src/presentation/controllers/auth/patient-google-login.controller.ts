import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IPatientGoogleAuthUseCase } from "../../../application/repositories/auth/IPatientGoogleAuthUsecase.ts";

export class PatientGoogleLoginController {
  constructor(private _googleLogin: IPatientGoogleAuthUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }

      const result = await this._googleLogin.execute(req.user as any);

      const { accessToken, role, user, message } = result;
      const clientUrl = process.env.CLIENT_ORIGIN || "http://localhost:5173";

      if (accessToken == "" || accessToken == " ") {
        return res.redirect(`${clientUrl}/login?message=${message}`);
      }

      return res.redirect(
        `${clientUrl}/login?token=${accessToken}&role=${role}&user=${JSON.stringify(user)}`,
      );
    } catch (error) {
      return next(error);
    }
  }
}
