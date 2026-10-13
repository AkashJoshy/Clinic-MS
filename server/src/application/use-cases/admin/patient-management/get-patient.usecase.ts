import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { PatientInfoDto } from "../../../dto/shared.dto.ts";
import { PatientMapper } from "../../../mappers/admin/patient.mapper.ts";
import type { IGetPatientUseCase } from "../../../repositories/admin/i-get-patient.usecase.ts";

export class GetPatientUseCase implements IGetPatientUseCase {
  constructor(
    private _patientRepository: IPatientRepository,
    private _addressRepository: IAddressRepository,
    private _userRepository: IUserRepository,
  ) {}

  async execute(patientId: string): Promise<PatientInfoDto | null> {
    const patient = await this._patientRepository.findById(patientId);

    if (!patient || !patient.id) {
      return null;
    }

    const [user, address] = await Promise.all([
      this._userRepository.findById(patient.userId!),
      this._addressRepository.findOneBy({
        ownerId: patient.id!,
      }),
    ]).catch((error) => {
      throw new Error(error);
    });

    return PatientMapper.toPatientInfoDto({
      user,
      patient,
      address,
    });
  }
}
