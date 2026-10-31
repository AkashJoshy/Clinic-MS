import { ConflictError } from "../errors/conflict.error.ts";
import type {
  BillingCycle,
  SubscriptionFeature,
  SubscriptionPlanProps,
  SubscriptionPlanStatus,
} from "../types/subscription-plan.types.ts";

export class SubscriptionPlan {
  constructor(
    public readonly id: string,
    public name: string,
    public tagline: string,
    public description: string,
    public price: number,
    public readonly currency: string,
    public billingCycle: BillingCycle,
    public colorTheme: string,
    public badgeText: string | null,
    public isPopular: boolean,
    public status: SubscriptionPlanStatus,
    public features: SubscriptionFeature[],
    public activeSubscribersCount: number,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(props: SubscriptionPlanProps): SubscriptionPlan {
    return new SubscriptionPlan(
      props.id,
      props.name,
      props.tagline,
      props.description,
      props.price,
      props.currency,
      props.billingCycle,
      props.colorTheme,
      props.badgeText,
      props.isPopular,
      props.status,
      props.features,
      props.activeSubscribersCount,
      props.createdAt,
      props.updatedAt,
    );
  }

  static createActive(
    props: Omit<SubscriptionPlanProps, "status">,
  ): SubscriptionPlan {
    return SubscriptionPlan.create({ ...props, status: "ACTIVE" });
  }

  static createInactive(
    props: Omit<SubscriptionPlanProps, "status">,
  ): SubscriptionPlan {
    return SubscriptionPlan.create({ ...props, status: "INACTIVE" });
  }

  updateDetails(data: {
    name?: string;
    tagline?: string;
    description?: string;
    price?: number;
    billingCycle?: BillingCycle;
    colorTheme?: string;
    badgeText?: string | null;
    isPopular?: boolean;
    features?: SubscriptionFeature[];
  }): void {
    if (data.name !== undefined) this.name = data.name;
    if (data.tagline !== undefined) this.tagline = data.tagline;
    if (data.description !== undefined) this.description = data.description;

    if (data.price !== undefined) {
      if (!Number.isSafeInteger(data.price) || data.price < 0) {
        throw new Error(
          "Subscription price must be a non-negative safe integer.",
        );
      }
      this.price = data.price;
    }

    if (data.billingCycle !== undefined) {
      this.billingCycle = data.billingCycle;
    }

    if (data.colorTheme !== undefined) {
      this.colorTheme = data.colorTheme;
    }

    if (data.badgeText !== undefined) {
      this.badgeText = data.badgeText;
    }

    if (data.isPopular !== undefined) {
      this.isPopular = data.isPopular;
    }

    if (data.features !== undefined) {
      this.features = data.features.map((feature) => ({ ...feature }));
    }
  }

  activate(): void {
    if (this.status === "ACTIVE") {
      throw new ConflictError("Subscription is already active");
    }
    this.status = "ACTIVE";
  }

  deactivate(): void {
    if (this.status === "INACTIVE") {
      throw new ConflictError("Subscription is already inactive");
    }
    this.status = "INACTIVE";
  }

  updateActiveSubscribersCount(count: number): void {
    if (!Number.isSafeInteger(count) || count < 0) {
      throw new Error(
        "Active subscribers count must be a non-negative integer.",
      );
    }

    this.activeSubscribersCount = count;
  }
}
