import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IGetPatientUseCase } from "../../../application/interfaces/repositories/admin/patient/i-get-patient.usecase.ts";
import type { IUpdateStatusUseCase } from "../../../application/interfaces/repositories/admin/patient/i-update-status.usecase.ts";
import type { IGetAllPatientsUseCase } from "../../../application/interfaces/repositories/admin/patient/i-get-all-patients.usecase.ts";

export class PatientController {
  constructor(
    private readonly _getPatient: IGetPatientUseCase,
    private readonly _getPatients: IGetAllPatientsUseCase,
    private readonly _updatePatient: IUpdateStatusUseCase,
  ) {}

  async getAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this._getPatients.execute();

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Doctors"),
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getPatient(req: Request, res: Response, next: NextFunction) {
    try {
      let patientId = req.params.patientId;
      patientId = Array.isArray(patientId) ? patientId[0] : patientId;

      if (!patientId) {
        throw new NotFoundError("Patient");
      }

      const data = await this._getPatient.execute(patientId);

      if (!data) {
        return res.status(ResponseStatusCode.OK).json({
          success: true,
          message: RESPONSE_MESSAGE.PATIENT_NOT_FOUND,
          data: data,
        });
      }
      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Doctor"),
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updatePatientStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      let id = req.params.patientId;
      id = Array.isArray(id) ? id[0] : id;

      const response = await this._updatePatient.execute({ ...data, id });

      const { message, ...userData } = response;

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message,
        data: userData,
      });
    } catch (error) {
      return next(error);
    }
  }
}
