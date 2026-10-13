import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import type { IGenerateSlotsUseCase } from "../../../application/repositories/doctor/i-generate-slots.usecase.ts";

export class GenerateSlotsController {
  constructor(private _generateSlots: IGenerateSlotsUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let doctorClinicId = req.params.doctorClinicId;
      const data = req.body;

      doctorClinicId = Array.isArray(doctorClinicId)
        ? doctorClinicId[0]
        : doctorClinicId;

      const response = await this._generateSlots.excute({
        ...data,
        doctorClinicId,
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.GENERATED.replace("Resource", "Slots"),
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  }
}
