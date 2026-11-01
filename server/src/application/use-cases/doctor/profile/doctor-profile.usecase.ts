import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IDoctorDetailsService } from "../../../interfaces/services/doctor/i-doctor-details.service.ts";
import type { IDoctorProfileUseCase } from "../../../interfaces/repositories/doctor/profile/i-doctor-profile.usecase.ts";
import type { DoctorProfileInfoResponseDto } from "../../../dto/doctor.dto.ts";

export class DoctorProfileUseCase implements IDoctorProfileUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(userId: string): Promise<DoctorProfileInfoResponseDto> {
    const doctor = await this._doctorRepository.findOneBy({
      userId,
    });

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const response = await this._doctorDetailsService.executeOne(doctor);

    return response;
  }
}
