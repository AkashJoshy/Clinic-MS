import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { ILoginUseCase } from "../../../application/interfaces/repositories/auth/i-login.usecase.ts";
import type { IDoctorLoginUseCase } from "../../../application/interfaces/repositories/auth/i-doctor-login.usecase.ts";
import type { IPatientGoogleAuthUseCase } from "../../../application/interfaces/repositories/auth/i-patient-google-auth.usecase.ts";

export class LoginController {
  constructor(
    private readonly _adminLogin: ILoginUseCase,
    private readonly _doctorLogin: IDoctorLoginUseCase,
    private readonly _patientLogin: ILoginUseCase,
    private readonly _googleLogin: IPatientGoogleAuthUseCase,
  ) {}

  async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this._adminLogin.execute(data);

      if ("token" in result) {
        return res.status(ResponseStatusCode.OK).json({
          success: true,
          message: RESPONSE_MESSAGE.OTP_EMAIL_MESSAGE,
          data: result,
        });
      }

      const { tokenPair, role, user, message } = result;

      const { access, refresh } = tokenPair;

      const updatedRole = role.toLowerCase();
      const refreshTokenRole =
        updatedRole === "patient"
          ? "patientRefreshToken"
          : updatedRole === "admin"
            ? "adminRefreshToken"
            : updatedRole === "doctor"
              ? "doctorRefreshToken"
              : "";

      res.cookie(refreshTokenRole, refresh, {
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

  async doctorLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this._doctorLogin.execute(data);

      if (result === "PENDING") {
        return res.status(ResponseStatusCode.FORBIDDEN).json({
          success: false,
          message: RESPONSE_MESSAGE.DOCTOR_PENDING,
          data: {
            status: result,
          },
        });
      } else if (result === "REJECTED") {
        return res.status(ResponseStatusCode.FORBIDDEN).json({
          success: false,
          message: RESPONSE_MESSAGE.DOCTOR_REJECTED,
          data: {
            status: result,
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

  async patientLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const result = await this._patientLogin.execute(data);

      if ("token" in result) {
        return res.status(ResponseStatusCode.OK).json({
          success: true,
          message: RESPONSE_MESSAGE.OTP_EMAIL_MESSAGE,
          data: result,
        });
      }

      const { tokenPair, role, user, message } = result;

      const { access, refresh } = tokenPair;

      const updatedRole = role.toLowerCase();
      const refreshTokenRole =
        updatedRole === "patient"
          ? "patientRefreshToken"
          : updatedRole === "admin"
            ? "adminRefreshToken"
            : updatedRole === "doctor"
              ? "doctorRefreshToken"
              : "";

      res.cookie(refreshTokenRole, refresh, {
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

  async patientGoogleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }

      const result = await this._googleLogin.execute(req.user as any);

      const { tokenPair, role, user, message } = result;
      const clientUrl = process.env.CLIENT_ORIGIN || "http://localhost:5173";

      const { access, refresh } = tokenPair;

      const accessToken = access;

      if (!user || accessToken == "" || accessToken == " " || refresh === "") {
        return res.redirect(`${clientUrl}/login?message=${message}`);
      }

      res.cookie("refreshToken", refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.redirect(
        `${clientUrl}/login?token=${accessToken}&role=${role}&user=${JSON.stringify(user)}`,
      );
    } catch (error) {
      return next(error);
    }
  }
}
