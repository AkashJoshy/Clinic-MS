import type { IGetAllSubscriptionPlansUseCase } from "../../../interfaces/repositories/admin/subscription/i-get-all-subscription-plans.usecase.ts";
import type { ISubscriptionPlanRepository } from "../../../../domain/repositories/i-subscription-plan.repository.ts";
import type {
  GetAllSubscriptionPlansQueryDto,
  SubscriptionManagementResponseDto,
} from "../../../dto/subscription-plan.dto.ts";

export class GetAllSubscriptionPlansUseCase
  implements IGetAllSubscriptionPlansUseCase
{
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    query?: GetAllSubscriptionPlansQueryDto,
  ): Promise<SubscriptionManagementResponseDto> {
    const limit = query?.limit ?? 6;
    const allPage = query?.allPage ?? 1;
    const activePage = query?.activePage ?? 1;
    const inactivePage = query?.inactivePage ?? 1;

    const search = query?.search?.trim();
    const searchFilter: Record<string, any> = {};

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      searchFilter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { tagline: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
        { "features.name": { $regex: escaped, $options: "i" } },
      ];
    }

    const [
      allPaginated,
      activePaginated,
      inactivePaginated,
      allPlansForStats,
    ] = await Promise.all([
      this._subscriptionPlanRepository.paginate(
        { ...searchFilter },
        { page: allPage, limit, sort: { createdAt: -1 } },
      ),
      this._subscriptionPlanRepository.paginate(
        { status: "ACTIVE", ...searchFilter },
        { page: activePage, limit, sort: { createdAt: -1 } },
      ),
      this._subscriptionPlanRepository.paginate(
        { status: "INACTIVE", ...searchFilter },
        { page: inactivePage, limit, sort: { createdAt: -1 } },
      ),
      this._subscriptionPlanRepository.find(),
    ]);

    const totalPlans = allPlansForStats.length;
    const activePlans = allPlansForStats.filter(
      (p) => p.status === "ACTIVE",
    ).length;
    const totalSubscribers = allPlansForStats.reduce(
      (total, p) => total + (p.activeSubscribersCount || 0),
      0,
    );
    const estimatedMonthlyRevenue = allPlansForStats.reduce((total, p) => {
      if (p.status !== "ACTIVE") return total;
      const count = p.activeSubscribersCount || 0;
      let monthlyEquivalent = p.price;
      if (p.billingCycle === "YEARLY") {
        monthlyEquivalent = p.price / 12;
      } else if (p.billingCycle === "QUARTERLY") {
        monthlyEquivalent = p.price / 3;
      } else if (p.billingCycle === "LIFETIME") {
        monthlyEquivalent = 0;
      }
      return total + monthlyEquivalent * count;
    }, 0);

    return {
      all: allPaginated,
      active: activePaginated,
      inactive: inactivePaginated,
      stats: {
        totalPlans,
        activePlans,
        totalSubscribers,
        estimatedMonthlyRevenue: Math.round(estimatedMonthlyRevenue),
      },
    };
  }
}
