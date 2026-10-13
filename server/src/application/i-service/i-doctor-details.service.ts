import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { AdminDoctorFullInfoDto } from "../dto/doctor.dto.ts";

export interface IDoctorDetailsService {
  executeOne(doctor: Doctor): Promise<AdminDoctorFullInfoDto>;
  executeMany(doctors: Doctor[]): Promise<AdminDoctorFullInfoDto[]>;
}
