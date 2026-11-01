import type { AdminDoctorInfoResponseDto } from "../../../../dto/doctor.dto.ts";

export interface IGetDoctorUseCase {
  execute(doctorId: string): Promise<AdminDoctorInfoResponseDto | null>;
}
