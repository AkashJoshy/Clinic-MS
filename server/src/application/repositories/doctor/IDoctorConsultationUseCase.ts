import type { DoctorConsultationDetailsDto } from "../../dto/doctor.dto.ts";

export interface IDoctorConsultationUseCase {
  execute(data: DoctorConsultationDetailsDto): Promise<DoctorConsultationDetailsDto>;
}