import type { Address } from "../../../domain/entities/address.entity.ts";
import type Patient from "../../../domain/entities/patient.entity.ts";
import type User from "../../../domain/entities/user.entity.ts";
import type {
  PatientBasicInfoResponseDto,
  PatientInfoResponseDto,
} from "../../dto/patient.dto.ts";

export class PatientMapper {
  static toPatientBasicInfo(patientDetails: PatientBasicInfoResponseDto) {
    const {
      id,
      userId,
      displayName,
      patientNumber,
      medicalInformation,
      gender,
      imageUrl,
      createdAt,
    } = patientDetails.patient as PatientBasicInfoResponseDto["patient"];
    const user = patientDetails.user as PatientBasicInfoResponseDto["user"];

    return {
      patient: {
        id,
        userId,
        displayName,
        patientNumber,
        medicalInformation,
        gender,
        imageUrl: {
          url: imageUrl.url,
        },
        createdAt,
      },
      user: user
        ? {
            email: user.email,
            phone: user.phone,
            isActive: user.isActive,
            isBlocked: user.isBlocked,
          }
        : null,
    };
  }

  static toPatientInfoDto(patientDetails: PatientInfoResponseDto) {
    const { user, address, patient } = patientDetails;
    const patientDet = this.toPatientBasicInfo({
      user,
      patient,
    });

    return {
      patient: patientDet.patient,
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
      user: patientDet.user
        ? {
            ...patientDet.user,
            createdAt: user?.createdAt ?? null,
            isEmailVerified: user?.isEmailVerified ?? false,
          }
        : null,
    } as PatientInfoResponseDto;
  }

  static toPatientFullInfo({
    patient,
    user,
    address,
  }: {
    patient: Patient;
    address: Address | null;
    user: User | null;
  }) {
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
  }
}
