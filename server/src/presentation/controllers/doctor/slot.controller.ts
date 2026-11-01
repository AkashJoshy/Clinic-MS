import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGenerateSlotsUseCase } from "../../../application/interfaces/repositories/doctor/slot/i-generate-slots.usecase.ts";
import type { IConfirmSlotsUseCase } from "../../../application/interfaces/repositories/doctor/slot/i-confirm-slots.usecase.ts";

export class SlotController {
  constructor(
    private readonly _generateSlots: IGenerateSlotsUseCase,
    private readonly _confirmSlots: IConfirmSlotsUseCase,
  ) {}

  async generateSlots(req: Request, res: Response, next: NextFunction) {
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

  async confirmSlots(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(`Hello...`);
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
