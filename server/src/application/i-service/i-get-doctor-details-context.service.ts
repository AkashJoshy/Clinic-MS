import type { DoctorDetailsDto } from "../dto/doctor.dto.ts";

export interface IGetDoctorDetailsContextService {
  execute(doctorId: string): Promise<DoctorDetailsDto>;
}
