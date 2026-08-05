import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IAddDepartmentUseCase } from "../../../application/repositories/admin/IAddDepartmentUseCase.ts";

export class AddDepartmentController {
  constructor(private _addDepartmentUseCase: IAddDepartmentUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.body;
      await this._addDepartmentUseCase.execute(data);
      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        message: RESPONSE_MESSAGE.DEPARTMENT_CREATED,
      });
    } catch (error) {
      return next(error);
    }
  }
}