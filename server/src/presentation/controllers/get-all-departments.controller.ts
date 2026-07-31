import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../domain/enums/response.enums.js";
import { RESPONSE_MESSAGE } from "../../domain/constants/response.constant.js";
import type { IGetAllDepartmentsUseCase } from "../../application/repositories/admin/IGetAllDepartmentsUseCase.ts";


export class GetAllDepartmentsController{
  constructor(private _allDepartments: IGetAllDepartmentsUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
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