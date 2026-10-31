import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { IWalletRepository } from "../../../../domain/repositories/i-wallet-repository.ts";
import type {
  GetSubscriptionUpgradeOptionsResponseDTO,
  SubscriptionChangeType,
} from "../../../dto/doctor-subscription.dto.ts";
import type { IGetSubscriptionUpgradeOptionsUseCase } from "../../../interfaces/repositories/doctor/subscription/i-get-subscription-upgrade-options.usecase.ts";
import type { ISubscriptionChangeCalculationService } from "../../../interfaces/services/subscription/i-subscription-change-calculation.service.ts";

export class GetSubscriptionUpgradeOptionsUseCase implements IGetSubscriptionUpgradeOptionsUseCase {
  constructor(
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository,
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
    private readonly _subscriptionChangeCalculationService: ISubscriptionChangeCalculationService,
  ) {}

  async execute(
    doctorId: string,
  ): Promise<GetSubscriptionUpgradeOptionsResponseDTO> {
    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Active subscription plans");
    }

    const currentSubscription =
      await this._doctorSubscriptionRepository.findCurrentByDoctorId(doctorId);

    const activePlans = await this._subscriptionPlanRepository.findAllActive();

    if (!activePlans) {
      throw new NotFoundError("Active subscription plans");
    }

    const currentPlan = currentSubscription
      ? await this._subscriptionPlanRepository.findById(
          currentSubscription.planId,
        )
      : null;

    const options: GetSubscriptionUpgradeOptionsResponseDTO["options"] = activePlans
      .filter((plan) => plan.id !== currentSubscription?.planId)
      .map((plan) => {
        const calculation = this._subscriptionChangeCalculationService.execute({
          currentPrice: currentPlan?.price ?? 0,
          targetPrice: plan.price,
          billingCycle: currentPlan?.billingCycle ?? plan.billingCycle,
          currentPeriodStart: currentSubscription?.currentPeriodStart ?? null,
        });

        return {
          planId: plan.id!,
          planName: plan.name,
          price: plan.price,
          currency: plan.currency,
          billingCycle: plan.billingCycle,
          changeType: calculation.changeType,
          unusedSubscriptionCredit: calculation.unusedSubscriptionCredit,
          payableAmount: calculation.payableAmount,
          features: plan.features.map((feature) => ({
            id: feature.id,
            name: feature.name,
            isIncluded: feature.isIncluded,
          })),
        };
      });

    return {
      currentSubscription:
        currentSubscription && currentPlan
          ? {
              id: currentSubscription.id!,
              planId: currentPlan.id!,
              planName: currentPlan.name,
              price: currentSubscription.price,
              currency: currentSubscription.currency,
              billingCycle: currentSubscription.billingCycle,
              currentPeriodStart: currentSubscription.currentPeriodStart,
              currentPeriodEnd: currentSubscription.currentPeriodEnd,
            }
          : null,
      options,
    };
  }
}
