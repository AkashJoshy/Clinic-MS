import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type {
  SubscriptionPlanStatusDto,
  SubscriptionPlanStatusResponseDto,
} from "../../../dto/subscription-plan.dto.ts";
import type { IUpdateSubscriptionPlanStatusUseCase } from "../../../interfaces/repositories/admin/subscription/i-update-subscription-plan-status.usecase.ts";

export class UpdateSubscriptionPlanStatusUseCase implements IUpdateSubscriptionPlanStatusUseCase {
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    data: SubscriptionPlanStatusDto,
  ): Promise<SubscriptionPlanStatusResponseDto> {
    const { id, status } = data;
    const subscription = await this._subscriptionPlanRepository.findById(id);

    if (!subscription || !subscription.id) {
      throw new NotFoundError("Subscription Plan");
    }

    if (status === "ACTIVE") {
      subscription.deactivate();
    } else if (status === "INACTIVE") {
      subscription.activate();
    }

    const updatedPlan =
      await this._subscriptionPlanRepository.findByIdAndUpdate(id, {
        status: subscription.status,
      });

    if (!updatedPlan) {
      throw new DatabaseError("Database Error");
    }

    return {
      id,
      status: updatedPlan.status,
    };
  }
}
