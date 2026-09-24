import { NotFoundError } from "../../domain/errors/not-found.error.ts";
import type { IAddressRepository } from "../../domain/repositories/i-address.repository.ts";
import type { IClinicRepository } from "../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../domain/repositories/i-user.repository.ts";
import type { DoctorDetailsDto } from "../dto/doctor.dto.ts";
import type { IGetDoctorDetailsContextService } from "../i-service/i-get-doctor-details-context.service.ts";

export class GetDoctorDetailsContextService implements IGetDoctorDetailsContextService {
  constructor(
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _clinicRepository: IClinicRepository,
    private readonly _doctorClinicRepository: IDoctorClinicRepository,
    private readonly _addressRepository: IAddressRepository,
  ) {}

  async execute(doctorId: string): Promise<DoctorDetailsDto> {
    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const user = await this._userRepository.findById(doctor.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Doctor");
    }

    const doctorClinic = await this._doctorClinicRepository.findOneBy({
      doctorId: doctor.id,
    });

    if (!doctorClinic || !doctorClinic.id || !doctorClinic.clinicId) {
      throw new NotFoundError("Doctor");
    }

    const clinic = await this._clinicRepository.findById(doctorClinic.clinicId);

    if (!clinic || !clinic.id) {
      throw new NotFoundError("Clinic");
    }

    const clinicAddress = await this._addressRepository.findOneBy({
      ownerId: clinic.id,
      ownerType: "Clinic",
    });

    if (!clinicAddress || !clinicAddress.id) {
      throw new NotFoundError("Clinic Address");
    }

    return {
      user,
      doctor,
      doctorClinic,
      clinic,
      address: clinicAddress,
    };

  }
}
