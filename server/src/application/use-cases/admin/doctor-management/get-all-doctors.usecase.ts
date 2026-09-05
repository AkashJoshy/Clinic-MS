import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { DoctorInfo } from "../../../dto/doctor.dto.ts";
import type { IDoctorDetailsService } from "../../../IService/i-doctor-details.service.ts";
import type { IGetAllDoctorsUseCase } from "../../../repositories/admin/i-get-all-doctors.usecase.ts";

export class GetAllDoctorsUseCase implements IGetAllDoctorsUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(): Promise<DoctorInfo[]> {
    const doctors = await this._doctorRepository.find();

    const response = await this._doctorDetailsService.execute(doctors);
    return response;
  }
}
