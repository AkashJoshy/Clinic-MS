import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type {
  AdminDoctorInfoDto,
} from "../../../dto/doctor.dto.ts";
import type { IDoctorDetailsService } from "../../../i-service/i-doctor-details.service.ts";
import { DoctorMapper } from "../../../mappers/admin/doctor.mapper.ts";
import type { IGetDoctorUseCase } from "../../../repositories/admin/i-get-doctor.usecase.ts";

export class GetDoctorUseCase implements IGetDoctorUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(doctorId: string): Promise<AdminDoctorInfoDto | null> {
    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id || !doctor.userId) {
      return null;
    }
    const response = await this._doctorDetailsService.executeOne(doctor);
    
    return DoctorMapper.toAdminDoctorInfo(response);
  }
}
