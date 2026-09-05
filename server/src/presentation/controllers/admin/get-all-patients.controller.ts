import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetAllPatientsUseCase } from "../../../application/repositories/admin/i-get-all-patients.usecase.ts";

export class GetAllPatientsController {
  constructor(private readonly _getPatients: IGetAllPatientsUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this._getPatients.execute();

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Doctors"),
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
