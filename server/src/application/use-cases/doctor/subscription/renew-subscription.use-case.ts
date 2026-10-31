import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { ResourceError } from "../../../../domain/errors/resource.error.ts";

import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";

import type {
  RenewSubscriptionDto,
  RenewSubscriptionResponseDto,
} from "../../../dto/doctor-subscription.dto.ts";

import type { IRenewSubscriptionUseCase } from "../../../interfaces/repositories/doctor/subscription/i-renew-subscription.use-case.ts";

export class RenewSubscriptionUseCase implements IRenewSubscriptionUseCase {
  constructor(
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository,
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    data: RenewSubscriptionDto,
  ): Promise<RenewSubscriptionResponseDto> {
    const { doctorId, planId } = data;

    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    const plan = await this._subscriptionPlanRepository.findById(planId);

    if (!plan || !plan.id) {
      throw new NotFoundError("Subscription Plan");
    }

    const subscription =
      await this._doctorSubscriptionRepository.findCurrentByDoctorId(doctorId);

    if (!subscription || !subscription.id) {
      throw new NotFoundError("Doctor subscription");
    }

    if (subscription.planId !== planId) {
      throw new ResourceError(
        "The selected plan does not match your current subscription.",
      );
    }

    if (
      !subscription.currentPeriodEnd ||
      new Date(subscription.currentPeriodEnd).getTime() <= Date.now()
    ) {
      throw new ResourceError(
        "Your subscription has expired. Please purchase a subscription to continue.",
      );
    }

    subscription.renew()

    // if (subscription.autoRenew && !subscription.cancelledAt) {
    //   throw new ResourceError(
    //     "Auto-renewal is already enabled for your subscription.",
    //   );
    // }

    // 7. Re-enable auto-renewal and clear cancellation details
    const updatedSubscription =
      await this._doctorSubscriptionRepository.findByIdAndUpdate(
        subscription.id,
        {
          autoRenew: true,
          cancelledAt: null,
          cancellationReason: null,
          cancellationMessage: null,
        },
      );

    if (!updatedSubscription) {
      throw new DatabaseError(
        "Failed to renew your subscription. Please try again later.",
      );
    }

    return {
      doctorId: updatedSubscription.doctorId,
      subscriptionId: updatedSubscription.id!,
      status: updatedSubscription.status,
      autoRenew: updatedSubscription.autoRenew,
      currentPeriodEnd: updatedSubscription.currentPeriodEnd!,
    };
  }
}
