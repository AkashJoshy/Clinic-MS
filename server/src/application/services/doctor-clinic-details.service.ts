import type { IDoctorClinicRepository } from "../../domain/repositories/i-doctor-clinic.repository.ts";
import type { SafeDoctorClinic } from "../dto/doctor-clinic.dto.ts";
import type { DoctorClinicDetailsDto } from "../dto/shared.dto.ts";
import type { IDoctorClinicDetailsService } from "../i-service/i-doctor-clinic-details.service.ts";

export class DoctorClinicDetailsService implements IDoctorClinicDetailsService {
  constructor(private _doctorClinicRepository: IDoctorClinicRepository) {}

  async executeOne(doctorId: string): Promise<SafeDoctorClinic[]> {
    const doctorClinics = await this._doctorClinicRepository.findBy({
      doctorId,
    });

    return doctorClinics;
  }

  async executeMany(doctorIds: string[]): Promise<DoctorClinicDetailsDto> {
    const doctorClinics = await this._doctorClinicRepository.findByIds(
      "doctorId",
      doctorIds,
    );

    const doctorClinicMap = new Map<string, typeof doctorClinics>();

    for (let dc of doctorClinics) {
      const existing = doctorClinicMap.get(dc.doctorId!) ?? [];

      existing.push(dc);

      doctorClinicMap.set(dc.doctorId!, existing);
    }

    return {
      doctorClinics,
      doctorClinicMap
    }
  }
}
