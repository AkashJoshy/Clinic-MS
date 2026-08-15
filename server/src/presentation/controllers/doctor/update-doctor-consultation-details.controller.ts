import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IDoctorConsultationUseCase } from "../../../application/repositories/doctor/IDoctorConsultationUseCase.ts";

export class UpdateDoctorConsultationDetailsController {
  constructor(private _doctorConsultation: IDoctorConsultationUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.userId
      const data = req.body;

      userId = Array.isArray(userId) ? userId[0] : userId

      const response = await this._doctorConsultation.execute({ ...data, userId });

      return res.status(ResponseStatusCode.ACCEPTED).json({
        success: true,
        message: RESPONSE_MESSAGE.ACCOUNT_UPDATED.replace("Account", "Consultation Details"),
        data: response
      });
    } catch (error) {
      return next(error);
    }
  }
}
