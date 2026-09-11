import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { ILogoutUseCase } from "../../../application/repositories/auth/i-logout.usecase.ts";

export class LogoutController {
  constructor(private _logout: ILogoutUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.body.role;
      const refreshTokenRole =
        role === "patient"
          ? "patientRefreshToken"
          : role === "admin"
            ? "adminRefreshToken"
            : role === "doctor"
              ? "doctorRefreshToken"
              : "";
      const refreshToken = req.cookies[refreshTokenRole]

      console.log(`Refresh Token of ${role}`);
      console.log(refreshToken);

      const result = await this._logout.execute(refreshToken);

      res.clearCookie(refreshTokenRole, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
