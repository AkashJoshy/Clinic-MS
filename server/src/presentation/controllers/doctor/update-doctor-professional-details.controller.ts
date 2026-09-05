import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IDoctorProfessionalUseCase } from "../../../application/repositories/doctor/i-doctor-professional.usecase.ts";

export class UpdateDoctorProfessionalDetailsController {
  constructor(private _doctorProfessional: IDoctorProfessionalUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.userId;
      const data = req.body;

      userId = Array.isArray(userId) ? userId[0] : userId;

      const response = await this._doctorProfessional.execute({
        ...data,
        userId,
      });

      return res.status(ResponseStatusCode.ACCEPTED).json({
        success: true,
        message: RESPONSE_MESSAGE.ACCOUNT_UPDATED.replace(
          "Account",
          "Doctor Details",
        ),
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  }
}
