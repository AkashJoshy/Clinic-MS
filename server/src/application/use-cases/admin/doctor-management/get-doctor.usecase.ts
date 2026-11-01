import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type {
  AdminDoctorInfoDto,
  AdminDoctorInfoResponseDto,
} from "../../../dto/doctor.dto.ts";
import type { IGetDoctorUseCase } from "../../../interfaces/repositories/admin/doctor/i-get-doctor.usecase.ts";
import type { IDoctorDetailsService } from "../../../interfaces/services/doctor/i-doctor-details.service.ts";
import { DoctorMapper } from "../../../mappers/admin/doctor.mapper.ts";

export class GetDoctorUseCase implements IGetDoctorUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(doctorId: string): Promise<AdminDoctorInfoResponseDto | null> {
    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id || !doctor.userId) {
      return null;
    }
    const response = await this._doctorDetailsService.executeOne(doctor);

    return DoctorMapper.toAdminDoctorInfo(response);
  }
}
