import type { IAddressRepository } from "../../../../domain/repositories/IAddressRepository.ts";
import type { IPatientRepository } from "../../../../domain/repositories/IPatientRepository.ts";
import type { PatientProfile } from "../../../dto/patient.dto.ts";
import type { IPatientProfilesUseCase } from "../../../repositories/patient/IPatientProfilesUseCase.ts";

export class PatientProfilesUseCase implements IPatientProfilesUseCase {
  constructor(
    private readonly _patientRepository: IPatientRepository,
    readonly _addressRepository: IAddressRepository,
  ) {}

  async execute(userId: string): Promise<PatientProfile[]> {
    const patients = await this._patientRepository.findAllByUserId(userId);
    
    if (!patients) return [];

    const updatedPatients = patients.map(patient => {
      return {
        ...patient,
        imageUrl: {
          url: patient.imageUrl.url
        }
      }
    })

    const patientIds = updatedPatients.map((p) => p.id).filter((p) => p !== null);
    const addressess = await this._addressRepository.findByIds(
      "ownerId",
      patientIds,
    );

    const addressMap = new Map(addressess.map((a) => [a.ownerId, a]));

    const response = updatedPatients.map((patient) => {
      const address = (()=> {
        const addr = patient && patient.id ? addressMap.get(patient.id) : null;

        if (!addr) return null

        const {
          createdAt, updatedAt, ownerId, ownerType, ...rest
        } = addr

        return rest
      })()

      return {
        ...patient,
        address: address,
      }
    })

    return response;
  }
}
