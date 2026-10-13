import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { DoctorProffesionalDetailsDto } from "../../../dto/doctor.dto.ts";
import { DoctorProfessionalMapper } from "../../../mappers/doctor/professional.mapper.ts";
import type { IDoctorProfessionalUseCase } from "../../../repositories/doctor/i-doctor-professional.usecase.ts";

export class UpdateDoctorProfessionalDetailsUseCase implements IDoctorProfessionalUseCase {
  constructor(
    readonly _userRepository: IUserRepository,
    readonly _doctorRepository: IDoctorRepository,
  ) {}

  async execute(
    data: DoctorProffesionalDetailsDto,
  ): Promise<DoctorProffesionalDetailsDto> {
    const { userId, id, languages, ...profData } = data;

    const user = await this._userRepository.findById(userId);

    if (!user || !user.id || !id) {
      throw new NotFoundError("Doctor");
    }

    const doctor = await this._doctorRepository.findById(id);

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    doctor.addLanguages(data.languages);
    doctor.updateProfessionalDetails(profData);

    await this._doctorRepository.findByIdAndUpdate(doctor.id, doctor);

    return DoctorProfessionalMapper.toDoctorProffesionalDetails(doctor, userId)
  }
}
