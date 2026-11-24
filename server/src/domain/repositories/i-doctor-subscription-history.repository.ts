import type { DoctorSubscriptionHistory } from "../entities/doctor-subscription-history.entity.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IDoctorSubscriptionHistoryRepository extends IBaseRepository<DoctorSubscriptionHistory> {
  findByDoctorId(doctorId: string): Promise<DoctorSubscriptionHistory[]>;

  findBySubscriptionId(
    subscriptionId: string,
  ): Promise<DoctorSubscriptionHistory[]>;
}
