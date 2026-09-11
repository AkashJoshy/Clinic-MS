import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IUpdateEmergencyContactUseCase } from "../../../application/repositories/patient/i-update-emergency-contact.usecase.ts";
import type { EmergencyContact } from "../../../domain/types/patient.types.ts";
import type { RelationToPatient } from "../../../domain/constants/patient.constants.ts";

export class UpdatePatientEmergencyContactController {
  constructor(private _updatePatient: IUpdateEmergencyContactUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const idsParam = req.params.patientId;
      const patientId = Array.isArray(idsParam) ? idsParam[0] : idsParam;

      if (!patientId) {
        return res.status(ResponseStatusCode.BAD_REQUEST).json({
          success: false,
          message: RESPONSE_MESSAGE.USER_NOT_FOUND,
        });
      }

      const { name, phone, relationship }: EmergencyContact = req.body;

      const result = await this._updatePatient.execute({
        id: patientId,
        name,
        phone,
        relationship: relationship.toUpperCase() as RelationToPatient,
      });

      return res.status(ResponseStatusCode.ACCEPTED).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Emergency Contact"),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
