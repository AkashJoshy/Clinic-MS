import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IUpdateStatusUseCase } from "../../../application/repositories/admin/i-update-status.usecase.ts";

export class UpdatePatientStatusController {
  constructor(private readonly _updatePatient: IUpdateStatusUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
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
