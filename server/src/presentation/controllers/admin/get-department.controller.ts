import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IGetDepartmentUseCase } from "../../../application/repositories/admin/IGetDepartmentUseCase.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";

export class GetDepartmentController {
  constructor(
    private readonly _getDepartment: IGetDepartmentUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let departmentId = req.params.departmentId
      if (Array.isArray(departmentId)) {
        departmentId = departmentId[0]
      }

      if (!departmentId) {
        throw new NotFoundError("Department")
      }

      const data = await this._getDepartment.execute(departmentId)

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "department"),
        data: data
      });
    } catch (error) {
      return next(error);
    }
  }
}