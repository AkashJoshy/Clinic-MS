import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IUpdateStatusUseCase } from "../../../application/repositories/admin/IUpdateStatusUseCase.ts";

export class UpdateDoctorStatusController {
  constructor(private readonly _updateDoctor: IUpdateStatusUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      let id = req.params.doctorId;
      id = Array.isArray(id) ? id[0] : id;

      const message = await this._updateDoctor.execute({ ...data, id });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: message,
      });
    } catch (error) {
      return next(error);
    }
  }
}
