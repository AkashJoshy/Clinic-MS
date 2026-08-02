import type { DoctorInfo } from "../../dto/doctor.dto.ts";

export interface IDoctorProfileUseCase {
  execute(userId: string): Promise<DoctorInfo>;
}