import type { CalculateSubscriptionChangeParams, SubscriptionChangeCalculationResult } from "../../../dto/doctor-subscription.dto.ts";

export interface ISubscriptionChangeCalculationService {
  execute(
    data: CalculateSubscriptionChangeParams,
  ): SubscriptionChangeCalculationResult;
}
