import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IDoctorUpdateReapplicationUseCase } from "../../../application/repositories/doctor/i-doctor-update-reapplication.usecase.ts";
import type { DoctorReapplicationFiles } from "../../../domain/types/doctor.types.ts";

export class UpdateDoctorReapplicationController {
  constructor(
    private _updatedoctorReapplication: IDoctorUpdateReapplicationUseCase,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
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
      }

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
