import type { NextFunction, Request, Response } from "express";
import type { CreateDepartmentDto } from "../../../application/dto/admin.dto.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enums.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IEditDepartmentUseCase } from "../../../application/repositories/admin/i-edit-department.usecase.ts";

export class EditDepartmentController {
  constructor(private readonly _editDepartment: IEditDepartmentUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let departmentId = req.params.departmentId;

      if (Array.isArray(departmentId)) {
        departmentId = departmentId[0];
      }

      const data: CreateDepartmentDto = req.body;

      if (!departmentId) {
        throw new NotFoundError("Department");
      }

      await this._editDepartment.execute({
        id: departmentId,
        ...data,
      });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace("Resource", "department"),
      });
    } catch (error) {
      return next(error);
    }
  }
}
