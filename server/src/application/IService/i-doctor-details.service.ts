import type { Doctor } from "../../domain/entities/doctor.ts";
import type { DoctorInfo } from "../dto/doctor.dto.ts";

export interface IDoctorDetailsService {
  execute(doctors: Doctor[]): Promise<DoctorInfo[]>;
}
