import type Patient from "../../domain/entities/patient.entity.ts";
import type { IAddressRepository } from "../../domain/repositories/i-address.repository.ts";
import type { IUserRepository } from "../../domain/repositories/i-user.repository.ts";
import type {
  PatientFullDetailsDto,
  PatientInfoDto,
} from "../dto/shared.dto.ts";
import type { IPatientDetailsService } from "../IService/i-patient-details.service.ts";

export class PatientDetailsService implements IPatientDetailsService {
  constructor(
    private _userRepository: IUserRepository,
    private _addressRepository: IAddressRepository,
  ) {}

  async execute(patients: Patient[]): Promise<PatientFullDetailsDto[]> {
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

    const response: PatientFullDetailsDto[] = patients.map((patient) => {
      const user = userMap.get(patient.userId!);

      const updatedUser = user
        ? ((user) => {
            const { password, ...data } = user;
            return data;
          })(user)
        : null;

      const address = addressMap.get(patient.id!);

      return {
        user: user
          ? {
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              phone: user.phone,
              role: user.role,
              provider: user.provider,
              isActive: user.isActive,
              isEmailVerified: user.isEmailVerified,
              isBlocked: user.isBlocked,
              isTwoFactorenabled: user.isTwoFactorenabled,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            }
          : null,
        patient: patient,
        address: address ?? null,
      };
    });

    return response;
  }
}
