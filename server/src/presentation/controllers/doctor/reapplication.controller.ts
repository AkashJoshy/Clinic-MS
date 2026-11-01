import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IDoctorReapplicationUseCase } from "../../../application/interfaces/repositories/doctor/reapplication/i-doctor-reapplication.usecase.ts";
import type { IDoctorUpdateReapplicationUseCase } from "../../../application/interfaces/repositories/doctor/reapplication/i-doctor-update-reapplication.usecase.ts";
import type { DoctorReapplicationFiles } from "../../../domain/types/doctor.types.ts";

export class ReapplicationController {
  constructor(
    private readonly _doctorReapplication: IDoctorReapplicationUseCase,
    private readonly _updatedoctorReapplication: IDoctorUpdateReapplicationUseCase,
  ) {}

  async getReapplication(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.params.token;

      token = Array.isArray(token) ? token[0] : token;

      if (!token) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }

      const result = await this._doctorReapplication.execute(token as string);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateReapplication(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.params.token;

      token = Array.isArray(token) ? token[0] : token;

      if (!token) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }

      const doctorData = {
        data: req.body,
        files: req.files as DoctorReapplicationFiles,
        token: token,
      };

      const result = await this._updatedoctorReapplication.execute(doctorData);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
