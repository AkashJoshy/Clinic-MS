import { DoctorSubscription } from "../../../../domain/entities/doctor-subscription.entity.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorSubscriptionRepository } from "../../../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { DoctorSubscriptionDto } from "../../../dto/doctor-subscription.dto.ts";
import type { IGetSubscriptionOverviewUseCase } from "../../../interfaces/repositories/doctor/subscription/i-get-subscription-overview.usecase.ts";

export class GetSubscriptionOverview implements IGetSubscriptionOverviewUseCase {
  constructor(
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _subscriptionPlansRepository: ISubscriptionPlanRepository,
    private readonly _doctorSubscriptionRepository: IDoctorSubscriptionRepository,
  ) {}

  async execute(userId: string): Promise<DoctorSubscriptionDto> {
    const doctor = await this._doctorRepository.findOneBy({ userId });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    const currentSubscription =
      await this._doctorSubscriptionRepository.findCurrentByDoctorId(doctor.id);

    // if (!currentSubscription) {
    //   return {
    //     current: null,
    //     availablePlans: [],
    //     history: [],
    //   }
    // }

    const subscriptionHistory =
      (await this._doctorSubscriptionRepository.findByDoctorId(doctor.id)) ??
      [];

    const subscriptionPlans = await this._subscriptionPlansRepository.findBy({
      status: "ACTIVE",
    });

    return {
      current: currentSubscription,
      availablePlans: subscriptionPlans,
      history: subscriptionHistory,
    };
  }
}
