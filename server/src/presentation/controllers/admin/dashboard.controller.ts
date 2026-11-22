import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetDepartmentDistributionUseCase } from "../../../application/interfaces/repositories/admin/dashboard/i-get-department-distribution.usecase.ts";
import type { IGetDashboardStatsUseCase } from "../../../application/interfaces/repositories/admin/dashboard/i-get-dashboard-stats.usecase.ts";

export class AdminDashboardController {
  constructor(
    private _getDepartmentDistributionUseCase: IGetDepartmentDistributionUseCase,
    private _getDashboardStatsUseCase: IGetDashboardStatsUseCase,
  ) {}

  async getDepartmentDistribution(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await this._getDepartmentDistributionUseCase.execute();

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace(
          "Resource",
          "Department distribution",
        ),
        data,
        silent: true,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getDashboardStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this._getDashboardStatsUseCase.execute();

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace(
          "Resource",
          "Department distribution",
        ),
        data,
        silent: true,
      });
    } catch (error) {
      return next(error);
    }
  }
}
