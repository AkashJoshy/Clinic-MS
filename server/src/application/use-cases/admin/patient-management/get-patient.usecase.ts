import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { PatientInfoDto } from "../../../dto/shared.dto.ts";
import type { IPatientDetailsService } from "../../../IService/i-patient-details.service.ts";
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

    return {
      patient: {
        id: patient.id!,
        userId: patient.userId!,
        displayName: patient.displayName,
        patientNumber: patient.patientNumber,
        relation: patient.relation,
        medicalInformation: patient.medicalInformation,
        imageUrl: {
          url: patient.imageUrl.url,
        },
        emergencyContact: patient.emergencyContact,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
      },

      address: address
        ? {
            addressLine: address.addressLine,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode,
            ownerId: address.ownerId,
          }
        : null,

      user: {
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        createdAt: user?.createdAt ?? null,
        isActive: user?.isActive ?? false,
        isEmailVerified: user?.isEmailVerified ?? false,
      },
    };
  }
}
