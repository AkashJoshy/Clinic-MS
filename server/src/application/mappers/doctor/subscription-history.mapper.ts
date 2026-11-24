import { DoctorSubscriptionHistory } from "../../../domain/entities/doctor-subscription-history.entity.ts";
import type { CreateSubscriptionHistoryMapperDto } from "../../dto/doctor-subscription.dto.ts";

export class DoctorSubscriptionHistoryMapper {
  static toCreatePurchased(
    data: CreateSubscriptionHistoryMapperDto,
  ): DoctorSubscriptionHistory {
    const {
      doctorId,
      subscriptionPlan,
      previousSubscription,
      newSubscription,
    } = data;

    return DoctorSubscriptionHistory.createPurchased({
      id: null,
      doctorId,
      subscriptionId: newSubscription.id!,
      planId: subscriptionPlan.id,
      planName: subscriptionPlan.name,
      status: "SUCCESS",
      billingCycle: newSubscription.billingCycle,
      price: newSubscription.price,
      currency: newSubscription.currency,
      features: newSubscription.features,
      previousPlanId: previousSubscription?.planId ?? null,
      previousPlanName: previousSubscription
        ? "Previous subscription plan"
        : null,
      previousPrice: previousSubscription?.price ?? null,
      paymentMethod: newSubscription.paymentMethod,
      transactionId: data.transactionId ?? null,
      description: previousSubscription
        ? `Doctor ${previousSubscription.price < subscriptionPlan.price ? "upgraded" : "downgraded"} subscription to ${subscriptionPlan.name}`
        : `Doctor purchased ${subscriptionPlan.name} subscription`,
      metadata: null,
      performedAt: new Date(),
      createdAt: null,
    });
  }
}