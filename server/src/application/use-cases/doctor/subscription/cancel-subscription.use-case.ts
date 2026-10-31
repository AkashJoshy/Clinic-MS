import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { ResourceError } from "../../../../domain/errors/resource.error.ts";

import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { IWalletRepository } from "../../../../domain/repositories/i-wallet-repository.ts";
import type { IWalletTransactionRepository } from "../../../../domain/repositories/i-wallet-transaction-repository.ts";
import type {
  CancelSubscriptionDto,
  CancelSubscriptionResponseDto,
} from "../../../dto/doctor-subscription.dto.ts";
import type { ICancelSubscriptionUseCase } from "../../../interfaces/repositories/doctor/subscription/i-cancel-subscription.use-case.ts";

export class CancelSubscriptionUseCase implements ICancelSubscriptionUseCase {
  constructor(
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository,
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
    private readonly _walletRepository: IWalletRepository,
    private readonly _walletTransactionRepository: IWalletTransactionRepository,
  ) {}

  async execute(
    data: CancelSubscriptionDto,
  ): Promise<CancelSubscriptionResponseDto> {
    const { doctorId, planId, cancellationMessage, cancellationReason } = data;

    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    const subscriptionPlan =
      await this._subscriptionPlanRepository.findById(planId);

    if (!subscriptionPlan || !subscriptionPlan.id) {
      throw new NotFoundError("Subscription Plan");
    }

    const subscription =
      await this._doctorSubscriptionRepository.findCurrentByDoctorId(doctorId);

    if (!subscription || !subscription.id) {
      throw new NotFoundError("Doctor subscription");
    }

    if (
      !subscription.currentPeriodEnd ||
      new Date(subscription.currentPeriodEnd).getTime() <= Date.now()
    ) {
      throw new ResourceError(
        "Your subscription has expired. Please purchase a subscription to continue.",
      );
    }

    subscription.cancel(cancellationReason, cancellationMessage);

    const updatedSubscription =
      await this._doctorSubscriptionRepository.findByIdAndUpdate(
        subscription.id,
        {
          cancellationReason: subscription.cancellationReason,
          cancellationMessage: subscription.cancellationMessage,
          autoRenew: subscription.autoRenew,
          cancelledAt: subscription.cancelledAt,
        },
      );

    if (!updatedSubscription) {
      throw new DatabaseError(
        "Failed to cancel the subscription. Please try again later.",
      );
    }

    return {
      doctorId: updatedSubscription.doctorId,
      subscriptionId: updatedSubscription.id!,
      status: updatedSubscription.status,
      autoRenew: updatedSubscription.autoRenew,
      cancelledAt: updatedSubscription.cancelledAt!,
      cancellationMessage: updatedSubscription.cancellationMessage!,
    };
  }
}
