import type { DoctorProffesionalDetailsDto } from "../../dto/doctor.dto.ts";

export interface IDoctorProfessionalUseCase {
  execute(data: DoctorProffesionalDetailsDto): Promise<DoctorProffesionalDetailsDto>;
}