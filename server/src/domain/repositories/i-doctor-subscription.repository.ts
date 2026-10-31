import type { DoctorSubscription } from "../entities/doctor-subscription.entity.ts";
import type { DoctorSubscriptionStatus } from "../types/doctor-subscription.types.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IDoctorSubscriptionRepository extends IBaseRepository<DoctorSubscription> {
  findByDoctorId(doctorId: string): Promise<DoctorSubscription[]>;

  findCurrentByDoctorId(doctorId: string): Promise<DoctorSubscription | null>;

  findByStatus(status: DoctorSubscriptionStatus): Promise<DoctorSubscription[]>;

  existsActiveByDoctorId(
    doctorId: string,
    excludeSubscriptionId?: string,
  ): Promise<boolean>;
}
