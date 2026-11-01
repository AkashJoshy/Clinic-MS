import type { Slot } from "../entities/slot.entity.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface ISlotRepository extends IBaseRepository<Slot> {
  findByDoctorId(doctorId: string): Promise<Slot[]>;
  findByDoctorIdForToday(doctorId: string): Promise<Slot[]>;
  findByDoctorIdAndDateRange(doctorId: string, from: Date, to: Date): Promise<Slot[]>;
}
