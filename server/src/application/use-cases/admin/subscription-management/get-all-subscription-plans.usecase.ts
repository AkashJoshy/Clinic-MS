import type { IGetAllSubscriptionPlansUseCase } from "../../../interfaces/repositories/admin/subscription/i-get-all-subscription-plans.usecase.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type { SafeSubscriptionResponseDto } from "../../../dto/subscription-plan.dto.ts";

export class GetAllSubscriptionPlansUseCase implements IGetAllSubscriptionPlansUseCase {
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(): Promise<SafeSubscriptionResponseDto[]> {
    const subscriptionPlans = await this._subscriptionPlanRepository.find();

    return subscriptionPlans;
  }
}
