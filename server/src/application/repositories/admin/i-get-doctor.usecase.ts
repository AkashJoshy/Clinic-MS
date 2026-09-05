import type { DoctorInfo } from "../../dto/doctor.dto.ts";

export interface IGetDoctorUseCase {
  execute(doctorId: string): Promise<DoctorInfo | null>;
}