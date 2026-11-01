import type { Doctor } from "../../../../domain/entities/doctor.entity.ts";
import type {
  AdminDoctorFullInfoResponseDto,
} from "../../../dto/doctor.dto.ts";

export interface IDoctorDetailsService {
  executeOne(doctor: Doctor): Promise<AdminDoctorFullInfoResponseDto>;
  executeMany(doctors: Doctor[]): Promise<AdminDoctorFullInfoResponseDto[]>;
}
