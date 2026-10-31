import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetAllSubscriptionPlansUseCase } from "../../../application/interfaces/repositories/admin/subscription/i-get-all-subscription-plans.usecase.ts";
import type { IEditSubscriptionPlanUseCase } from "../../../application/interfaces/repositories/admin/subscription/i-edit-subscription-plan.usecase.ts";
import type { ICreateSubscriptionPlanUseCase } from "../../../application/interfaces/repositories/admin/subscription/i-create-subscription-plan.usecase.ts";
import type { IUpdateSubscriptionPlanStatusUseCase } from "../../../application/interfaces/repositories/admin/subscription/i-update-subscription-plan-status.usecase.ts";

export class SubscriptionPlanController {
  constructor(
    private readonly _createSubscriptionUseCase: ICreateSubscriptionPlanUseCase,
    private readonly _editSubscriptionPlanUseCase: IEditSubscriptionPlanUseCase,
    private readonly _getAllSubscriptionPlansUseCase: IGetAllSubscriptionPlansUseCase,
    private readonly _updateSubscriptionPlanStatusUseCase: IUpdateSubscriptionPlanStatusUseCase,
  ) {}

  async getAllSubscriptionPlans(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const subscriptionPlans =
        await this._getAllSubscriptionPlansUseCase.execute();

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace(
          "Resource",
          "Subscription plans",
        ),
        data: subscriptionPlans,
      });
    } catch (error) {
      next(error);
    }
  }

  async editSubscriptionPlan(req: Request, res: Response, next: NextFunction) {
    try {
      let subscriptionId = req.params.subscriptionId;

      if (Array.isArray(subscriptionId)) {
        subscriptionId = subscriptionId[0];
      }
      const updatedPlan = await this._editSubscriptionPlanUseCase.execute({
        id: subscriptionId,
        ...req.body,
      });

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Subscription plan",
        ),
        data: updatedPlan,
      });
    } catch (error) {
      next(error);
    }
  }

  async createNewSubscriptionPlan(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = req.body;

      const newPlan = await this._createSubscriptionUseCase.execute(data);

      return res.status(ResponseStatusCode.CREATED).json({
        success: true,
        data: newPlan,
        message: RESPONSE_MESSAGE.CREATED.replace(
          "Resource",
          "Subscription Plan",
        ),
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateSubscriptionPlanStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(`Req.body: `);
      console.log(req.body);
      
      let subscriptionId = req.params.subscriptionId;
      subscriptionId = Array.isArray(subscriptionId)
        ? subscriptionId[0]
        : subscriptionId;
      const data = req.body;

      const updatedPlan =
        await this._updateSubscriptionPlanStatusUseCase.execute({
          id: subscriptionId,
          ...data,
        });

      return res.status(ResponseStatusCode.ACCEPTED).json({
        success: true,
        data: updatedPlan,
        message: RESPONSE_MESSAGE.UPDATED.replace(
          "Resource",
          "Subscription Plan",
        ),
      });
    } catch (error) {
      return next(error);
    }
  }
}
