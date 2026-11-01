import type { GetSubscriptionUpgradeOptionsResponseDTO } from "../../../../dto/doctor-subscription.dto.ts";

export interface IGetSubscriptionUpgradeOptionsUseCase {
  execute(doctorId: string): Promise<GetSubscriptionUpgradeOptionsResponseDTO>;
}
