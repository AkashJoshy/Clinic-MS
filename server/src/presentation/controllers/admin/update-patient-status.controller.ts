import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IUpdatePatientStatusUseCase } from "../../../application/repositories/admin/IUpdatePatientStatusUseCase.ts";

export class UpdatePatientStatusController {
  constructor(private readonly _updatePatient: IUpdatePatientStatusUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      let id = req.params.patientId;
      id = Array.isArray(id) ? id[0] : id;

      const message = await this._updatePatient.execute({ ...data, id });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: message,
      });
    } catch (error) {
      return next(error);
    }
  }
}
