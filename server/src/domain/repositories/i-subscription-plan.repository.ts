import type { SubscriptionPlan } from "../entities/subscription-plan.entity.ts";
import type { BillingCycle } from "../types/subscription-plan.types.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface ISubscriptionPlanRepository extends IBaseRepository<SubscriptionPlan> {
  existsByNameAndBillingCycle(
    name: string,
    billingCycle: BillingCycle,
    excludePlanId?: string,
  ): Promise<boolean>
  findAllActive(): Promise<SubscriptionPlan[]>
}
