import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IUpdateDoctorStatusUseCase } from "../../../application/repositories/admin/i-update-doctor-status.usecase.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";

export class RejectDoctorController {
  constructor(private readonly _updateDoctors: IUpdateDoctorStatusUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      let id = req.params.doctorId;
      id = Array.isArray(id) ? id[0] : id;

      await this._updateDoctors.execute({ ...data, id });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.REJECTED.replace("Resource", "Doctor"),
      });
    } catch (error) {
      return next(error);
    }
  }
}
