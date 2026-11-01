import type {
  CalculateSubscriptionChangeParams,
  SubscriptionChangeCalculationResult,
  SubscriptionChangeType,
} from "../../dto/doctor-subscription.dto.ts";
import type { ISubscriptionChangeCalculationService } from "../../interfaces/services/subscription/i-subscription-change-calculation.service.ts";

export class SubscriptionChangeCalculationService implements ISubscriptionChangeCalculationService {
  private readonly DAYS_PER_MONTH = 30;

  execute({
    currentPrice,
    targetPrice,
    billingCycle,
    currentPeriodStart,
  }: CalculateSubscriptionChangeParams): SubscriptionChangeCalculationResult {
    const isNewSubscription = !currentPeriodStart;

    const changeType: SubscriptionChangeType = isNewSubscription
      ? "CURRENT"
      : targetPrice > currentPrice
        ? "UPGRADE"
        : targetPrice < currentPrice
          ? "DOWNGRADE"
          : "CURRENT";

    const daysCount =
      billingCycle === "MONTHLY"
        ? this.DAYS_PER_MONTH
        : billingCycle === "QUARTERLY"
          ? this.DAYS_PER_MONTH * 3
          : billingCycle === "YEARLY"
            ? this.DAYS_PER_MONTH * 12
            : 0;

    let elapsedDays = 0;

    if (!isNewSubscription && currentPeriodStart && daysCount > 0) {
      const today = new Date();

      elapsedDays =
        Math.floor(
          (today.getTime() - currentPeriodStart.getTime()) /
            (1000 * 60 * 60 * 24),
        ) + 1;

      elapsedDays = Math.min(daysCount, Math.max(1, elapsedDays));
    }

    let unusedSubscriptionCredit = 0;
    let payableAmount = 0;

    if (isNewSubscription) {
      payableAmount = targetPrice;
    } else if (changeType === "UPGRADE") {
      const elapsedValue =
        daysCount > 0 ? (currentPrice / daysCount) * elapsedDays : 0;

      payableAmount = targetPrice - currentPrice + elapsedValue;
    } else if (changeType === "DOWNGRADE") {
      const usedValue =
        daysCount > 0 ? (currentPrice / daysCount) * elapsedDays : currentPrice;

      unusedSubscriptionCredit = Math.max(
        0,
        currentPrice - targetPrice - usedValue,
      );
    }

    return {
      changeType,
      unusedSubscriptionCredit,
      payableAmount: Math.max(0, payableAmount),
      elapsedDays,
    };
  }
}
