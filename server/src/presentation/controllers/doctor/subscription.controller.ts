import type { NextFunction, Request, Response } from "express";
import { ResponseStatusCode } from "../../../domain/enums/response.enum.ts";
import { RESPONSE_MESSAGE } from "../../../domain/constants/response.constant.ts";
import type { IGetSubscriptionOverviewUseCase } from "../../../application/interfaces/repositories/doctor/subscription/i-get-subscription-overview.usecase.ts";
import type User from "../../../domain/entities/user.entity.ts";
import type { IBuySubscriptionWithWalletUseCase } from "../../../application/interfaces/repositories/doctor/subscription/i-buy-subscription-with-wallet.usecase.ts";
import type { ICancelSubscriptionUseCase } from "../../../application/interfaces/repositories/doctor/subscription/i-cancel-subscription.use-case.ts";
import type { CancelSubscriptionDto } from "../../../application/dto/doctor-subscription.dto.ts";
import type { IGetSubscriptionUpgradeOptionsUseCase } from "../../../application/interfaces/repositories/doctor/subscription/i-get-subscription-upgrade-options.usecase.ts";

export class SubscriptionController {
  constructor(
    private readonly _getSubscriptionUseCase: IGetSubscriptionOverviewUseCase,
    private readonly _buySubscriptionWithWalletUseCase: IBuySubscriptionWithWalletUseCase,
    private readonly _cancelSubscriptionUseCase: ICancelSubscriptionUseCase,
    private readonly _getSubscriptionUpgradeOptionsUseCase: IGetSubscriptionUpgradeOptionsUseCase,
  ) {}

  async getSubscriptionOverview(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const subscriptionPlans = await this._getSubscriptionUseCase.execute(
        (req.user as User)?.id!,
      );

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

  async buySubscriptionWithWallet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { doctorId, planId, paymentMethod, payableAmount } = req.body;

      const createdSubscriptionDetails =
        await this._buySubscriptionWithWalletUseCase.execute({
          planId,
          doctorId,
          paymentMethod,
          payableAmount
        });

      const { currentPlan, planName } = createdSubscriptionDetails;

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.PLAN_PURCHASED(planName),
        data: currentPlan,
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      let subscriptionId = req.params.planId;

      if (Array.isArray(subscriptionId)) {
        subscriptionId = subscriptionId[0];
      }
      const { doctorId, cancellationMessage, cancellationReason } = req.body;

      const subscriptionDetails = await this._cancelSubscriptionUseCase.execute(
        {
          planId: subscriptionId!,
          doctorId,
          cancellationMessage,
          cancellationReason,
        },
      );

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.PLAN_CANCELLED,
        data: subscriptionDetails,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSubscriptionUpgradeOptions(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let doctorId = req.params.doctorId;

      if (Array.isArray(doctorId)) {
        doctorId = doctorId[0];
      }

      const subscriptionDetails =
        await this._getSubscriptionUpgradeOptionsUseCase.execute(doctorId!);

      return res.status(ResponseStatusCode.OK).json({
        success: true,
        message: RESPONSE_MESSAGE.FETCHED.replace("Resource", "wallet options"),
        data: subscriptionDetails,
        silent: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
