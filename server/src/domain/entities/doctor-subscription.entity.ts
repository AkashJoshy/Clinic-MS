import type {
  CancellationReason,
  DoctorSubscriptionProps,
  DoctorSubscriptionStatus,
  SubscriptionPaymentMethod,
} from "../types/doctor-subscription.types.ts";
import type {
  BillingCycle,
  SubscriptionFeature,
} from "../types/subscription-plan.types.ts";

export class DoctorSubscription {
  constructor(
    public id: string | null,
    public doctorId: string,
    public planId: string,
    public status: DoctorSubscriptionStatus,
    public billingCycle: BillingCycle,
    public price: number,
    public currency: string,
    public features: SubscriptionFeature[],
    public startedAt: Date | null,
    public currentPeriodStart: Date | null,
    public currentPeriodEnd: Date | null,
    public autoRenew: boolean,
    public paymentMethod: SubscriptionPaymentMethod,
    public cancelledAt: Date | null,
    public cancellationReason: CancellationReason | null,
    public cancellationMessage: string | null,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<DoctorSubscriptionProps>): DoctorSubscription {
    return new DoctorSubscription(
      data.id ?? null,
      data.doctorId!,
      data.planId!,
      data.status ?? "PENDING",
      data.billingCycle!,
      data.price ?? 0,
      data.currency ?? "INR",
      data.features ?? [],
      data.startedAt ?? null,
      data.currentPeriodStart ?? null,
      data.currentPeriodEnd ?? null,
      data.autoRenew ?? false,
      data.paymentMethod!,
      data.cancelledAt ?? null,
      data.cancellationReason ?? null,
      data.cancellationMessage ?? null,
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  static createActive(
    data: Partial<Omit<DoctorSubscriptionProps, "status">>,
  ): DoctorSubscription {
    return this.create({
      ...data,
      status: "ACTIVE",
    });
  }

  isPending(): boolean {
    return this.status === "PENDING";
  }

  isActive(): boolean {
    return (
      this.status === "ACTIVE" &&
      (this.currentPeriodEnd === null ||
        this.currentPeriodEnd.getTime() > Date.now())
    );
  }

  isExpired(): boolean {
    return (
      this.currentPeriodEnd !== null &&
      this.currentPeriodEnd.getTime() <= Date.now()
    );
  }

  activate(startedAt: Date, periodStart: Date, periodEnd: Date | null): void {
    if (this.status !== "PENDING") {
      throw new Error("Only pending subscriptions can be activated.");
    }

    if (periodEnd !== null && periodEnd.getTime() <= periodStart.getTime()) {
      throw new Error("Subscription period end must be after its start.");
    }

    this.status = "ACTIVE";
    this.startedAt = startedAt;
    this.currentPeriodStart = periodStart;
    this.currentPeriodEnd = periodEnd;
  }

  replace(): void {
    if (this.status !== "ACTIVE" && this.status !== "PAST_DUE") {
      throw new Error("Only active or past-due subscriptions can be replaced.");
    }

    this.status = "REPLACED";
    this.autoRenew = false;
  }

  renew(periodStart: Date, periodEnd: Date | null): void {
    if (this.status !== "ACTIVE") {
      throw new Error("Only active subscriptions can be renewed.");
    }

    if (periodEnd !== null && periodEnd.getTime() <= periodStart.getTime()) {
      throw new Error("Subscription period end must be after its start.");
    }

    this.currentPeriodStart = periodStart;
    this.currentPeriodEnd = periodEnd;
  }

  cancel(
    cancellationReason: DoctorSubscriptionProps["cancellationReason"],
    cancellationMessage: DoctorSubscriptionProps["cancellationMessage"],
    cancelledAt: Date = new Date(),
  ): void {
    if (this.status !== "ACTIVE" && this.status !== "PAST_DUE") {
      throw new Error(
        "Only active or past-due subscriptions can be cancelled.",
      );
    }

    this.cancelledAt = cancelledAt;
    this.cancellationReason = cancellationReason;
    this.cancellationMessage = cancellationMessage;
    this.autoRenew = false;
  }

  expire(): void {
    if (this.status !== "ACTIVE") {
      throw new Error("Only active subscriptions can be expired.");
    }

    if (!this.isExpired()) {
      throw new Error("Subscription period has not ended.");
    }

    this.status = "EXPIRED";
    this.autoRenew = false;
  }

  markPastDue(): void {
    if (this.status !== "ACTIVE") {
      throw new Error("Only active subscriptions can become past due.");
    }

    this.status = "PAST_DUE";
  }

  enableAutoRenew(): void {
    if (this.status !== "ACTIVE") {
      throw new Error(
        "Auto-renewal can only be enabled for active subscriptions.",
      );
    }

    this.autoRenew = true;
  }

  disableAutoRenew(): void {
    this.autoRenew = false;
  }

  updatePaymentMethod(paymentMethod: SubscriptionPaymentMethod): void {
    if (this.status !== "ACTIVE") {
      throw new Error(
        "Payment method can only be changed for active subscriptions.",
      );
    }

    this.paymentMethod = paymentMethod;
  }
}
