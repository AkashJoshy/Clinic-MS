import type {
  PatientBasicInfoDto,
  PatientInfoDto,
} from "../../dto/shared.dto.ts";

export class PatientMapper {
  static toPatientBasicInfo(patientDetails: PatientBasicInfoDto) {
    const {
      id,
      userId,
      displayName,
      patientNumber,
      medicalInformation,
      gender,
      imageUrl,
      createdAt,
    } = patientDetails.patient as PatientBasicInfoDto["patient"];
    const user = patientDetails.user as PatientBasicInfoDto["user"];

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

  static toPatientInfoDto(patientDetails: PatientInfoDto) {
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
    } as PatientInfoDto;
  }
}
