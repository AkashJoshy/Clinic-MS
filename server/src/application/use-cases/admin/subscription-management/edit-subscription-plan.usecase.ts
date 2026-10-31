import { ConflictError } from "../../../../domain/errors/conflict.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type {
  EditSubscriptionPlanDto,
  SafeSubscriptionResponseDto,
} from "../../../dto/subscription-plan.dto.ts";
import type { IEditSubscriptionPlanUseCase } from "../../../interfaces/repositories/admin/subscription/i-edit-subscription-plan.usecase.ts";

export class EditSubscriptionPlanUseCase implements IEditSubscriptionPlanUseCase {
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}
  async execute(
    data: EditSubscriptionPlanDto,
  ): Promise<SafeSubscriptionResponseDto> {
    const { id, ...rest } = data;

    const existingPlan = await this._subscriptionPlanRepository.findById(id);

    if (!existingPlan) {
      throw new NotFoundError("Subscription plan not found");
    }

    const name = data.name ?? existingPlan.name;
    const billingCycle = data.billingCycle ?? existingPlan.billingCycle;

    const duplicate =
      await this._subscriptionPlanRepository.existsByNameAndBillingCycle(
        name,
        billingCycle,
        id,
      );

    if (duplicate) {
      throw new ConflictError(
        "A subscription plan with this name and billing cycle already exists",
      );
    }

    const updatedPlan = await this._subscriptionPlanRepository.updateOneById(
      id,
      rest,
    );

    if (!updatedPlan) {
      throw new NotFoundError("Subscription plan not found");
    }

    return updatedPlan;
  }
}
