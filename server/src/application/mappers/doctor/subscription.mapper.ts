import { DoctorSubscription } from "../../../domain/entities/doctor-subscription.entity.ts";
import type { ActiveSubscriptionMapperDto } from "../../dto/doctor-subscription.dto.ts";

export class DoctorSubscriptionMapper {
  static toActiveDoctorSubscription({
    doctorId,
    subscriptionPlan,
    startDate,
    endDate,
    paymentMethod,
  }: ActiveSubscriptionMapperDto): DoctorSubscription {
    return DoctorSubscription.createActive({
      doctorId: doctorId,
      planId: subscriptionPlan.id,
      billingCycle: subscriptionPlan.billingCycle,
      price: subscriptionPlan.price,
      currency: subscriptionPlan.currency ?? "INR",
      features: subscriptionPlan.features,
      startedAt: startDate!,
      currentPeriodStart: startDate!,
      currentPeriodEnd: endDate,
      autoRenew: false,
      paymentMethod: paymentMethod,
      cancelledAt: null,
    });
  }
}
