import { NotFoundError } from "../../domain/errors/not-found.error.ts";
import type { IClinicRepository } from "../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../domain/repositories/i-user.repository.ts";
import type {
  DoctorExistsDto,
  DoctorExistsResponseDto,
} from "../dto/doctor.dto.ts";
import type { IDoctorExistsService } from "../i-service/i-doctor-exists.service.ts";

export class DoctorExistsService implements IDoctorExistsService {
  constructor(
    readonly _userRepository: IUserRepository,
    readonly _doctorRepository: IDoctorRepository,
    readonly _doctorClinicRepository: IDoctorClinicRepository,
    readonly _clinicRepository: IClinicRepository,
  ) {}

  async execute(data: DoctorExistsDto): Promise<DoctorExistsResponseDto> {
    const { doctorId, clinicId, doctorClinicId } = data;
    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const user = await this._userRepository.findOneBy(doctor.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Doctor");
    }

    const clinic = await this._clinicRepository.findById(clinicId);

    if (!clinic || !clinic.id) {
      throw new NotFoundError("Clinic");
    }

    const doctorClinic =
      await this._doctorClinicRepository.findById(doctorClinicId);

    if (!doctorClinic || !doctorClinic.id) {
      throw new NotFoundError("doctor Clinic");
    }

    return {
      user,
      clinic,
      doctor,
      doctorClinic,
    };
  }
}
