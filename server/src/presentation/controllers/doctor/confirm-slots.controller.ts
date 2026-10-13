import type { NextFunction, Request, Response } from "express";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import type { IConfirmSlotsUseCase } from "../../../application/repositories/doctor/i-confirm-slots.usecase.ts";

export class ConfirmSlotsController {
  constructor(private _confirmSlots: IConfirmSlotsUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(`Hello...`)
      let doctorClinicId = req.params.doctorClinicId;
      const data = req.body;

      doctorClinicId = Array.isArray(doctorClinicId)
        ? doctorClinicId[0]
        : doctorClinicId;

      await this._confirmSlots.execute({
        ...data,
        doctorClinicId,
      });

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.CONFIRMED.replace("Resource", "Slots"),
      });
    } catch (error) {
      return next(error);
    }
  }
}
