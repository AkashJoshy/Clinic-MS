import { Types } from "mongoose";
import { BaseRepository } from "./base/base.repository.ts";
import type { ISubscriptionPlanPersistence } from "../models/subscription/subscription-plan.types.ts";
import { SubscriptionPlanModel } from "../models/subscription/subscription-plan.model.ts";
import type { ISubscriptionPlanRepository } from "../../domain/repositories/i-subscription-plan.repository.ts";
import { SubscriptionPlan } from "../../domain/entities/subscription-plan.entity.ts";
import type { BillingCycle } from "../../domain/types/subscription-plan.types.ts";

export class SubscriptionPlanRepository
  extends BaseRepository<SubscriptionPlan, ISubscriptionPlanPersistence>
  implements ISubscriptionPlanRepository
{
  constructor() {
    super(SubscriptionPlanModel);
  }

  async findAllActive(): Promise<SubscriptionPlan[]> {
    const subscriptionPlans = await SubscriptionPlanModel.find({
      status: "ACTIVE",
    });

    return subscriptionPlans.map((plan) => this.toDomain(plan));
  }

  async existsByNameAndBillingCycle(
    name: string,
    billingCycle: BillingCycle,
    excludePlanId?: string,
  ): Promise<boolean> {
    const escapedName = name.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exists = await SubscriptionPlanModel.exists({
      name: {
        $regex: `^${escapedName}$`,
        $options: "i",
      },
      billingCycle,
    });

    if (excludePlanId) {
      return exists?._id.toString() == excludePlanId ? false : true;
    }

    return exists !== null;
  }

  protected toDomain(doc: ISubscriptionPlanPersistence) {
    return SubscriptionPlan.create({
      id: doc._id.toString(),
      name: doc.name,
      tagline: doc.tagline,
      description: doc.description,
      price: doc.price,
      currency: doc.currency,
      billingCycle: doc.billingCycle,
      colorTheme: doc.colorTheme,
      badgeText: doc.badgeText,
      isPopular: doc.isPopular,
      status: doc.status,
      features: doc.features.map((feature) => ({
        id: feature.id,
        name: feature.name,
        isIncluded: feature.isIncluded,
      })),
      activeSubscribersCount: doc.activeSubscribersCount,
      createdAt: doc.createdAt ?? null,
      updatedAt: doc.updatedAt ?? null,
    });
  }

  protected toPersistence(
    entity: SubscriptionPlan,
  ): Partial<ISubscriptionPlanPersistence> {
    return {
      name: entity.name,
      tagline: entity.tagline,
      description: entity.description,
      price: entity.price,
      currency: entity.currency,
      billingCycle: entity.billingCycle,
      colorTheme: entity.colorTheme,
      badgeText: entity.badgeText,
      isPopular: entity.isPopular,
      status: entity.status,
      features: entity.features.map((feature) => ({
        id: feature.id,
        name: feature.name,
        isIncluded: feature.isIncluded,
      })),
      activeSubscribersCount: entity.activeSubscribersCount,
    };
  }
}
