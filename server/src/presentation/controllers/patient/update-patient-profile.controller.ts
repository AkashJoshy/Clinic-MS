import type { NextFunction, Request, Response } from "express";
import type { IUpdatePatientProfileUseCase } from "../../../application/repositories/patient/i-update-patient-profile.usecase.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";

export class UpdatePatientProfileController {
  constructor(private _updatePatient: IUpdatePatientProfileUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const idsParam = req.params.patientId;
      const id = Array.isArray(idsParam) ? idsParam[0] : idsParam;

      if (!id) {
        return res.status(ResponseStatusCode.BAD_REQUEST).json({
          success: false,
          message: RESPONSE_MESSAGE.USER_NOT_FOUND,
        });
      }

      const {
        displayName,
        email,
        phone,
        dateOfBirth,
        gender,
        bloodGroup,
        allergies,
        chronicConditions,
      } = req.body;

      const result = await this._updatePatient.execute({
        displayName,
        id: id!,
        dateOfBirth,
        gender,
        email,
        phone,
        medicalInformation: {
          bloodGroup,
          allergies,
          chronicConditions,
        },
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Profile"),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
