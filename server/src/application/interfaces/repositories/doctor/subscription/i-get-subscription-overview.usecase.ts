import type { DoctorSubscriptionDto } from "../../../../dto/doctor-subscription.dto.ts";

export interface IGetSubscriptionOverviewUseCase {
  execute(userId: string): Promise<DoctorSubscriptionDto>;
}
