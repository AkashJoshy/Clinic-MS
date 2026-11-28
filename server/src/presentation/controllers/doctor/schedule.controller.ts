import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IUpdateScheduleUseCase } from "../../../application/interfaces/repositories/doctor/schedule/i-update-schedule.usecase.ts";

export class DoctorScheduleController {
  constructor(
    private readonly _updateScheduleUseCase: IUpdateScheduleUseCase,
  ) {}

  async updateSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this._updateScheduleUseCase.execute(data);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "Schedule"),
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
