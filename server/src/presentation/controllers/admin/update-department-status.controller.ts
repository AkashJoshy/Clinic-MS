import type { NextFunction, Request, Response } from "express";
import type { IUpdateDepartmentStatusUseCase } from "../../../application/repositories/admin/IUpdateDepartmentUseCase.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";

export class UpdateDepartmentStatusController {
  constructor(
    private readonly _updateDepartmentStatus: IUpdateDepartmentStatusUseCase,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const departmentId = req.params.departmentId;
      const data = req.body;

      const response = await this._updateDepartmentStatus.execute({
        id: departmentId,
        ...data,
      });

      const { message, ...departmentData } = response;

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: message,
        data: departmentData
      });
    } catch (error) {
      return next(error);
    }
  }
}