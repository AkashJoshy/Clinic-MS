import type { IClinicRepository } from "../../domain/repositories/i-clinic.repository.ts";
import type { SafeClinic } from "../dto/clinic.dto.ts";
import type { ClinicDetailsResponseDto } from "../dto/shared.dto.ts";
import type { IClinicDetailsService } from "../i-service/i-clinic-details.service.ts";

export class ClinicDetailsService implements IClinicDetailsService {
  constructor(private _clinicRepository: IClinicRepository) {}

  async executeOne(clinicId: string): Promise<SafeClinic | null> {
    const clinic = await this._clinicRepository.findById(clinicId);

    return clinic;
  }

  async executeMany(clinicIds: string[]): Promise<ClinicDetailsResponseDto> {
    const clinics = await this._clinicRepository.findByIds("id", clinicIds);

    const clinicMap = new Map(clinics.map((c) => [c.id, c]));

    return {
      clinics,
      clinicMap,
    }
  }
  
}
