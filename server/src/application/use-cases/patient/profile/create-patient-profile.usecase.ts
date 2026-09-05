import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import Patient from "../../../../domain/entities/patient.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type {
  CreatePatientProfileDto,
  PatientProfile,
} from "../../../dto/patient.dto.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import { Address } from "../../../../domain/entities/address.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import type { ICreatePatientProfileUseCase } from "../../../repositories/patient/i-create-patient-profile.usecase.ts";

export class CreatePatientProfileUseCase implements ICreatePatientProfileUseCase {
  constructor(
    private readonly _patientRepository: IPatientRepository,
    private readonly _addressRepository: IAddressRepository,
  ) {}

  async execute(data: CreatePatientProfileDto): Promise<PatientProfile> {
    const patientCount = await this._patientRepository.getPatientNumber();
    const patientNumber = `${process.env.PATIENT_NUMBER_MODEL || "PAT"}-${patientCount}`;

    const selfPatient = await this._patientRepository.findOneBy({
      userId: data.userId,
      relation: "SELF",
    });

    if (!selfPatient) {
      throw new NotFoundError("Profile cant create without Self Patient!");
    }

    const newPatient = await this._patientRepository.save(
      Patient.createDependent(
        {
          id: null,
          userId: data.userId,
          displayName: data.displayName,
          relation: data.relation.toUpperCase() as any,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender.toUpperCase() as any,
          medicalInformation: {
            bloodGroup: data.bloodGroup,
            allergies: data.allergies || [],
            chronicConditions: data.chronicConditions || [],
          },
          emergencyContact: {
            name: selfPatient.displayName,
            phone: data.phone,
            relationship: selfPatient.relation,
          },
        },
        patientNumber,
      ),
    );

    if (!newPatient.id) {
      throw new DatabaseError("Failed to create patient profile.");
    }

    const address = await this._addressRepository.save(
      Address.createForOwner(
        {
          id: null,
          ownerId: newPatient.id,
          addressLine: data.addressLine,
          country: data.country,
          state: data.state,
          city: data.city,
          pincode: data.pincode,
        },
        "Patient",
      ),
    );

    const response = {
      patient: {
        id: newPatient.id,
        userId: newPatient.userId,
        displayName: newPatient.displayName,
        patientNumber: newPatient.patientNumber,
        relation: newPatient.relation,
        gender: newPatient.gender,
        dateOfBirth: newPatient.dateOfBirth,
        imageUrl: {
          url: newPatient.imageUrl.url,
        },
        medicalInformation: {
          bloodGroup: newPatient.medicalInformation.bloodGroup,
          allergies: newPatient.medicalInformation.allergies,
          chronicConditions: newPatient.medicalInformation.chronicConditions,
        },
        emergencyContact: {
          name: newPatient.emergencyContact?.name ?? "",
          phone: newPatient.emergencyContact?.phone ?? "",
          relationship: newPatient.emergencyContact?.relationship ?? "",
        },
        createdAt: newPatient.createdAt,
        updatedAt: newPatient.updatedAt,
      },
      address: {
        id: address.id!,
        ownerId: address.ownerId,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        country: address.country,
        pincode: address.pincode,
      },
    };

    return response;
  }
}
