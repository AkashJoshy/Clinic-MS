import type { AdminDoctorInfo } from "../../dto/doctor.dto.ts";

export interface IGetDoctorUseCase {
  execute(doctorId: string): Promise<AdminDoctorInfo | null>;
}