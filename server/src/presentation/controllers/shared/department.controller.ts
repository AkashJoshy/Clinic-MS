import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetAllDepartmentsUseCase } from "../../../application/interfaces/repositories/shared/i-get-all-departments.usecase.ts";

export class DepartmentController {
  constructor(private _allDepartments: IGetAllDepartmentsUseCase) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._allDepartments.execute();
      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.SUCCESS,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
