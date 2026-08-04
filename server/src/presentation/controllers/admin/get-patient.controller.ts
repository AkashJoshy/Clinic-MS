import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetPatientUseCase } from "../../../application/repositories/admin/IGetPatientUseCase.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";

export class GetPatientController {
  constructor(private readonly _getPatient: IGetPatientUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {

      let patientId = req.params.patientId
      patientId = Array.isArray(patientId) ? patientId[0] : patientId

      if (!patientId) {
        throw new NotFoundError("Patient")
      }

      const data = await this._getPatient.execute(patientId);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Doctor"),
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
