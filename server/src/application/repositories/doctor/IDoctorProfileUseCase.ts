import type { DoctorProfileInfo } from "../../dto/doctor.dto.ts";

export interface IDoctorProfileUseCase {
  execute(userId: string): Promise<DoctorProfileInfo>;
}