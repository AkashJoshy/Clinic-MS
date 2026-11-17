import type { DoctorSettings } from "../entities/doctor-settings.entity.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IDoctorSettingsRepository extends IBaseRepository<DoctorSettings> {
  findByDoctorId(doctorId: string): Promise<DoctorSettings | null>;
}
