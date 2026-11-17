import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IUpdateDoctorSettingsUseCase } from "../../../application/interfaces/repositories/doctor/settings/i-update-doctor-settings.use-case.ts";
import type User from "../../../domain/entities/user.entity.ts";
import type { IGetDoctorSettingsUseCase } from "../../../application/interfaces/repositories/doctor/settings/i-get-doctor-settings.use-case.ts";

export class DoctorSettingsController {
  constructor(
    private readonly _getDoctorSettingsUseCase: IGetDoctorSettingsUseCase,
    private readonly _updateDoctorSettingsUseCase: IUpdateDoctorSettingsUseCase,
  ) {}

  async getDoctorSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const doctorSettings = await this._getDoctorSettingsUseCase.execute(
        (req.user as User)?.id!,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Doctor Settings",
        ),
        data: doctorSettings,
        silent: true,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateDoctorSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const doctorSettings = await this._updateDoctorSettingsUseCase.execute(
        (req.user as User)?.id!,
        req.body,
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Doctor Settings",
        ),
        data: doctorSettings
      });
    } catch (error) {
      return next(error);
    }
  }
}
