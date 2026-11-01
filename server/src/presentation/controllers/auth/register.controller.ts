import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IPatientRegisterUseCase } from "../../../application/interfaces/repositories/auth/i-patient-register.usecase.ts";
import type { RegisterUserProps } from "../../../domain/types/user.types.ts";
import type { IPatientGoogleAuthUseCase } from "../../../application/interfaces/repositories/auth/i-patient-google-auth.usecase.ts";
import type { IDoctorRegisterUseCase } from "../../../application/interfaces/repositories/auth/i-doctor-register.usecase.ts";

export class RegisterController {
  constructor(
    private readonly _registerUser: IPatientRegisterUseCase,
    private readonly _googleRegister: IPatientGoogleAuthUseCase,
    private readonly _doctorRegister: IDoctorRegisterUseCase,
  ) {}

  async patientRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email, password, phone, role }: RegisterUserProps =
        req.body;

      const result = await this._registerUser.execute({
        id: null,
        fullName,
        phone,
        email,
        password,
        role,
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.ACCOUNT_CREATED,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async patientGoogleRegister(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }

      const result = await this._googleRegister.execute(req.user as any);

      const { tokenPair, role, user, message } = result;
      const clientUrl = process.env.CLIENT_ORIGIN || "http://localhost:5173";

      const { access, refresh } = tokenPair;

      if (access == "" || access == " " || refresh === "") {
        return res.redirect(`${clientUrl}/signup?message=${message}`);
      }
      const accessToken = access;

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

  async doctorRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const files = req.files;

      const updatedData = {
        ...data,
        gender: data.gender.toUpperCase(),
        mode: data.mode.toUpperCase(),
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        consultationFee: Number(data.consultationFee),
      };

      await this._doctorRegister.execute({ ...updatedData, ...files });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  }
}
