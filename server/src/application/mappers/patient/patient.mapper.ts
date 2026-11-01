import type { RelationToPatient } from "../../../domain/constants/patient.constants.ts";
import Patient from "../../../domain/entities/patient.entity.ts";
import type { BasePatient } from "../../../domain/types/patient.types.ts";
import type { Gender } from "../../../domain/types/shared.types.ts";
import type { CreateDependentDto, NewPatientProfileDto } from "../../dto/patient.dto.ts";
import { AddressMapper } from "../shared/address.mapper.ts";

export class PatientMapper {
  static toDomain(patientDetails: BasePatient) {
    const {
      id,
      userId,
      displayName,
      patientNumber,
      relation,
      dateOfBirth,
      gender,
      medicalInformation,
      emergencyContact,
      imageUrl,
      createdAt,
      updatedAt,
    } = patientDetails;

    return {
      id: id ?? null,
      userId,
      displayName,
      patientNumber,
      relation: relation.toUpperCase() as RelationToPatient,
      imageUrl: {
        url: imageUrl.url,
      },
      dateOfBirth,
      gender: gender.toUpperCase() as Gender,
      medicalInformation: {
        bloodGroup: medicalInformation?.bloodGroup,
        allergies: medicalInformation?.allergies ?? [],
        chronicConditions: medicalInformation?.chronicConditions ?? [],
      },
      emergencyContact: emergencyContact
        ? {
            name: emergencyContact.name,
            phone: emergencyContact.phone,
            relationship: emergencyContact.relationship as RelationToPatient,
          }
        : {
            name: "",
            phone: "",
            relationship: "" as RelationToPatient,
          },
      createdAt,
      updatedAt,
    };
  }

  static toNewPatientProfile(patientDetails: NewPatientProfileDto) {
    const address = AddressMapper.toDomain(patientDetails.address);
    const patient = this.toDomain(patientDetails.patient);
    return {
      patient,
      address,
    };
  }

  static toDependentEntity(
  data: CreateDependentDto,
  selfPatient: BasePatient,
  phone: string,
  patientNumber: string,
): Patient {
  return Patient.createDependent(
    {
      id: null,
      userId: data.userId,
      displayName: data.displayName,
      relation: data.relation.toUpperCase() as RelationToPatient,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender.toUpperCase() as Gender,
      medicalInformation: {
        bloodGroup: data.bloodGroup!,
        allergies: data.allergies ?? [],
        chronicConditions: data.chronicConditions ?? [],
      },
      emergencyContact: {
        name: selfPatient.displayName,
        phone,
        relationship: selfPatient.relation,
      },
    },
    patientNumber,
  );
}

}
