import type { NextFunction, Request, Response } from "express";
import type { IUpdateDepartmentStatusUseCase } from "../../../application/repositories/admin/IUpdateDepartmentUseCase.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import type { IGetAllDoctorsUseCase } from "../../../application/repositories/admin/IGetAllDoctorsUseCase.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";

export class GetAllDoctorsController {
  constructor(private readonly _getDoctors: IGetAllDoctorsUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this._getDoctors.execute();

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
