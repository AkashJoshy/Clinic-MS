import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IPatientProfilesUseCase } from "../../../application/repositories/patient/IPatientProfilesUseCase.ts";

export class PatientProfilesController {
  constructor(private _patientProfiles: IPatientProfilesUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.userId;

      userId = Array.isArray(userId) ? userId[0] : userId;

      if (!userId) {
        return res.status(ResponseStatusCode.UNAUTHORIZED).json({
          success: false,
          message: RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
        });
      }
      const result = await this._patientProfiles.execute(userId);

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
