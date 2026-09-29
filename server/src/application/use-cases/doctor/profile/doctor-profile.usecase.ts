import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { DoctorProfileInfo } from "../../../dto/doctor.dto.ts";
import type { IDoctorDetailsService } from "../../../i-service/i-doctor-details.service.ts";
import type { IDoctorProfileUseCase } from "../../../repositories/doctor/i-doctor-profile.usecase.ts";

export class DoctorProfileUseCase implements IDoctorProfileUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(userId: string): Promise<DoctorProfileInfo> {
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
