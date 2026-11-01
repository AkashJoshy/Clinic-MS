import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type {
  PatientProfile,
  PatientProfileResponseDto,
} from "../../../dto/patient.dto.ts";
import type { IPatientProfilesUseCase } from "../../../interfaces/repositories/patient/profile/i-patient-profiles.usecase.ts";

export class PatientProfilesUseCase implements IPatientProfilesUseCase {
  constructor(
    private readonly _patientRepository: IPatientRepository,
    private readonly _addressRepository: IAddressRepository,
  ) {}

  async execute(userId: string): Promise<PatientProfileResponseDto[]> {
    const patients = await this._patientRepository.findAllByUserId(userId);

    if (!patients) return [];

    const updatedPatients = patients.map((patient) => {
      return {
        ...patient,
        imageUrl: {
          url: patient.imageUrl.url,
        },
      };
    });

    const patientIds = updatedPatients
      .map((p) => p.id)
      .filter((p) => p !== null);
    const addressess = await this._addressRepository.findByIds(
      "ownerId",
      patientIds,
    );

    const addressMap = new Map(addressess.map((a) => [a.ownerId, a]));

    const response: PatientProfile[] = updatedPatients.map((patient) => {
      const addr = patient.id ? addressMap.get(patient.id) : undefined;

      const address = addr
        ? (({ createdAt, updatedAt, ownerType, ...rest }) => rest)(addr)
        : null;

      return {
        address,
        patient,
      };
    });

    return response;
  }
}
