import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IDoctorDetailsService } from "../../../interfaces/services/doctor/i-doctor-details.service.ts";
import { DoctorMapper } from "../../../mappers/admin/doctor.mapper.ts";
import type { IGetAllDoctorsUseCase } from "../../../interfaces/repositories/admin/doctor/i-get-all-doctors.usecase.ts";
import type { DoctorDetailsCardResponseDto } from "../../../dto/doctor.dto.ts";

export class GetAllDoctorsUseCase implements IGetAllDoctorsUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(): Promise<DoctorDetailsCardResponseDto[]> {
    const doctors = await this._doctorRepository.find();

    const response = await this._doctorDetailsService.executeMany(doctors);

    const updatedResponse: DoctorDetailsCardResponseDto[] = response.map(
      (res) => {
        return DoctorMapper.toDoctorDetailsCard(res);
      },
    );

    return updatedResponse;
  }
}
