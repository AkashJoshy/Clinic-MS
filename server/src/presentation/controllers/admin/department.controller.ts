import type { NextFunction, Request, Response } from "express";
import type { IAddDepartmentUseCase } from "../../../application/interfaces/repositories/admin/department/i-add-department.usecase.ts";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IGetDepartmentUseCase } from "../../../application/interfaces/repositories/admin/department/i-get-department.usecase.ts";
import type { IUpdateDepartmentStatusUseCase } from "../../../application/interfaces/repositories/admin/department/i-update-department.usecase.ts";
import type { CreateDepartmentDto } from "../../../application/dto/department.dto.ts";
import type { IEditDepartmentUseCase } from "../../../application/interfaces/repositories/admin/department/i-edit-department.usecase.ts";

export class DepartmentController {
  constructor(
    private _addDepartmentUseCase: IAddDepartmentUseCase,
    private _editDepartment: IEditDepartmentUseCase,
    private _getDepartment: IGetDepartmentUseCase,
    private _updateDepartmentStatus: IUpdateDepartmentStatusUseCase,
  ) {}

  async addDepartment(req: Request, res: Response, next: NextFunction) {
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

  async editDepartment(req: Request, res: Response, next: NextFunction) {
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

  async getDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      let departmentId = req.params.departmentId;
      if (Array.isArray(departmentId)) {
        departmentId = departmentId[0];
      }

      if (!departmentId) {
        throw new NotFoundError("Department");
      }

      const data = await this._getDepartment.execute(departmentId);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "department"),
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateDepartment(req: Request, res: Response, next: NextFunction) {
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
        data: departmentData,
      });
    } catch (error) {
      return next(error);
    }
  }
}
