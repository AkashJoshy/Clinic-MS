import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetSubscriptionOverviewUseCase } from "../../../application/interfaces/repositories/doctor/subscription/i-get-subscription-overview.usecase.ts";
import type User from "../../../domain/entities/user.entity.ts";
import type { IGetDoctorDashboardOverviewUseCase } from "../../../application/interfaces/repositories/doctor/dashboard/i-get-doctor-dashboard-overview.use-case.ts";
import type { IGetDoctorCalendarUseCase } from "../../../application/interfaces/repositories/doctor/dashboard/i-get-doctor-calendar.usecase.ts";

export class DashboardController {
  constructor(
    private readonly _getDoctorDashboardOverviewUseCase: IGetDoctorDashboardOverviewUseCase,
    private readonly _getDoctorCalendarUseCase: IGetDoctorCalendarUseCase,
  ) {}

  async getDashboardOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const dashboardOverview =
        await this._getDoctorDashboardOverviewUseCase.execute(
          (req.user as User)?.id!,
        );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Dashboard"),
        data: dashboardOverview,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCalendarSlotsByDate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {

      let from = req.query.from;
      let to = req.query.to;

      if (Array.isArray(from)) {
        from = from[0];
      }

      if (Array.isArray(to)) {
        to = to[0];
      }

      const calendarSlots = await this._getDoctorCalendarUseCase.execute({
        userId: (req.user as User)?.id!,
        data: {
          from: new Date(from?.toString()!),
          to: new Date(to?.toString()!),
        },
      });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "Slots"),
        data: calendarSlots,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
