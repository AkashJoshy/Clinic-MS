import type { Doctor } from "../../domain/entities/Doctor.ts";
import type { DoctorInfo } from "../dto/doctor.dto.ts";

export interface IDoctorDetailsService {
  execute(doctors: Doctor[]): Promise<DoctorInfo[]>
}
