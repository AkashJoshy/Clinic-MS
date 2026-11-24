import type {
  DoctorSubscriptionHistoryAction,
  DoctorSubscriptionHistoryProps,
  DoctorSubscriptionHistoryStatus,
} from "../types/doctor-subscription-history.types.ts";
import type {
  BillingCycle,
  SubscriptionFeature,
} from "../types/subscription-plan.types.ts";

export class DoctorSubscriptionHistory {
  constructor(
    public readonly id: string | null,
    public readonly doctorId: string,
    public readonly subscriptionId: string,
    public readonly planId: string,
    public readonly planName: string,
    public readonly action: DoctorSubscriptionHistoryAction,
    public readonly status: DoctorSubscriptionHistoryStatus,
    public readonly billingCycle: BillingCycle,
    public readonly price: number,
    public readonly currency: string,
    public readonly features: SubscriptionFeature[],
    public readonly previousPlanId: string | null,
    public readonly previousPlanName: string | null,
    public readonly previousPrice: number | null,
    public readonly paymentMethod: string | null,
    public readonly transactionId: string | null,
    public readonly description: string | null,
    public readonly metadata: Record<string, unknown> | null,
    public readonly performedAt: Date,
    public readonly createdAt: Date | null,
  ) {}

  static create(
    data: DoctorSubscriptionHistoryProps,
  ): DoctorSubscriptionHistory {
    return new DoctorSubscriptionHistory(
      data.id,
      data.doctorId,
      data.subscriptionId,
      data.planId,
      data.planName,
      data.action,
      data.status,
      data.billingCycle,
      data.price,
      data.currency,
      data.features.map((feature) => ({ ...feature })),
      data.previousPlanId,
      data.previousPlanName,
      data.previousPrice,
      data.paymentMethod,
      data.transactionId,
      data.description,
      data.metadata ? { ...data.metadata } : null,
      data.performedAt,
      data.createdAt,
    );
  }

  static createPurchased(
    data: Omit<DoctorSubscriptionHistoryProps, "action">,
  ): DoctorSubscriptionHistory {
    return this.create({
      ...data,
      action: "PURCHASED",
    });
  }

  static createUpgraded(
    data: Omit<DoctorSubscriptionHistoryProps, "action">,
  ): DoctorSubscriptionHistory {
    return this.create({
      ...data,
      action: "UPGRADED",
    });
  }

  static createDowngraded(
    data: Omit<DoctorSubscriptionHistoryProps, "action">,
  ): DoctorSubscriptionHistory {
    return this.create({
      ...data,
      action: "DOWNGRADED",
    });
  }
  
}
