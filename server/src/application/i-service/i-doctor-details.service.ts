import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { AdminDoctorInfo } from "../dto/doctor.dto.ts";

export interface IDoctorDetailsService {
  executeOne(doctor: Doctor): Promise<AdminDoctorInfo>;
  executeMany(doctors: Doctor[]): Promise<AdminDoctorInfo[]>;
}
