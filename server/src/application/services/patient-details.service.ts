import type { Doctor } from "../../domain/entities/Doctor.ts";
import type Patient from "../../domain/entities/Patient.ts";
import type { IAddressRepository } from "../../domain/repositories/IAddressRepository.ts";
import type { IClinicRepository } from "../../domain/repositories/IClinicRepository.ts";
import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository.ts";
import type { IDoctorClinicRepository } from "../../domain/repositories/IDoctorClinicRepository.ts";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.ts";
import type { PatientInfoDto } from "../dto/shared.dto.ts";
import type { IPatientDetailsService } from "../IService/IPatientDetailsService.ts";

export class PatientDetailsService implements IPatientDetailsService {
  constructor(
    private _userRepository: IUserRepository,
    private _addressRepository: IAddressRepository,
  ) {}

  async execute(patients: Patient[]): Promise<PatientInfoDto[]> {
    const userIds = patients
      .map((patient) => patient.userId)
      .filter((p) => p !== null);
    const patientIds = patients
      .map((patient) => patient.id)
      .filter((p) => p !== null);

    const users = await this._userRepository.findByIds("id", userIds);
    const userMap = new Map(users.map((user) => [user.id, user]));

    const addressess = await this._addressRepository.findByIds(
      "ownerId",
      patientIds,
    );
    const addressMap = new Map(
      addressess.map((address) => [address.ownerId, address]),
    );

    const response: PatientInfoDto[] = patients.map((patient) => {
      const user = userMap.get(patient.userId!);
      const address = addressMap.get(patient.id!);

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
              ownerId: address.ownerId
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
    });

    return response;
  }
}
