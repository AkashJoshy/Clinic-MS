import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { ICreateSubscriptionPlanUseCase } from "../../../interfaces/repositories/admin/subscription/i-create-subscription-plan.usecase.ts";
import type {
  SafeSubscriptionPlanResponseDto,
  SubscriptionPlanProps,
} from "../../../../domain/types/subscription-plan.types.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import { SubscriptionPlan } from "../../../../domain/entities/subscription-plan.entity.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { ConflictError } from "../../../../domain/errors/conflict.error.ts";
import type { BaseSubscriptiontDto } from "../../../dto/subscription-plan.dto.ts";

export class CreateSubscriptionPlanUseCase implements ICreateSubscriptionPlanUseCase {
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    data: BaseSubscriptiontDto,
  ): Promise<SafeSubscriptionPlanResponseDto> {
    const { status, ...rest } = data;

    const planData: Omit<SubscriptionPlanProps, "status"> = {
      ...rest,
      createdAt: null,
      updatedAt: null,
    };

    let newSubscriptionPlan;
    if (data.status === "ACTIVE") {
      newSubscriptionPlan = SubscriptionPlan.createActive(planData);
    } else if (data.status === "INACTIVE") {
      newSubscriptionPlan = SubscriptionPlan.createInactive(planData);
    } else {
      throw new NotFoundError("Status");
    }

    if (!newSubscriptionPlan) {
      throw new DatabaseError("Subscription failed to update");
    }

    const isPlanExists =
      await this._subscriptionPlanRepository.existsByNameAndBillingCycle(
        newSubscriptionPlan.name,
        newSubscriptionPlan.billingCycle,
      );

    if (isPlanExists) {
      throw new ConflictError(
        "A subscription plan with this name and billing cycle already exists",
      );
    }

    const savedPlan =
      await this._subscriptionPlanRepository.save(newSubscriptionPlan);

    return savedPlan;
  }
}
