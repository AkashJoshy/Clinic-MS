import type { DoctorDetailsResponseDto } from "../../../dto/doctor.dto.ts";

export interface IGetDoctorDetailsContextService {
  execute(doctorId: string): Promise<DoctorDetailsResponseDto>;
}
