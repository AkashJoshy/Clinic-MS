import type { IPatientRepository } from "../../domain/repositories/i-patient.repository.ts";
import PatientModel, { type IPatient } from "../models/patient.model.ts";
import CounterModel from "../models/counter.model.ts";
import { BaseRepository } from "./base/base.repository.ts";
import { Types } from "mongoose";
import Patient from "../../domain/entities/patient.entity.ts";

export class PatientRepository
  extends BaseRepository<Patient, IPatient>
  implements IPatientRepository
{
  constructor() {
    super(PatientModel);
  }

  protected toPersistence(entity: Patient): Partial<IPatient> {
    return {
      userId: new Types.ObjectId(entity.userId),
      displayName: entity.displayName,
      patientNumber: entity.patientNumber,
      imageUrl: entity.imageUrl,
      relation: entity.relation,
      dateOfBirth: entity.dateOfBirth,
      gender: entity.gender,
      medicalInformation: entity.medicalInformation
        ? {
            bloodGroup: entity.medicalInformation.bloodGroup,
            allergies: entity.medicalInformation.allergies,
            chronicConditions: entity.medicalInformation.chronicConditions,
          }
        : {
            bloodGroup: "",
            allergies: [],
            chronicConditions: [],
          },
      emergencyContact: entity.emergencyContact
        ? {
            name: entity.emergencyContact.name ?? "",
            phone: entity.emergencyContact.phone ?? "",
            relationship: entity.emergencyContact.relationship ?? "",
          }
        : {
            name: "",
            phone: "",
            relationship: "",
          },
    };
  }

  async getPatientNumber(): Promise<number> {
    const counter = await CounterModel.findOneAndUpdate(
      {
        name: "patientNumber",
      },
      {
        $inc: {
          value: 1,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      },
    );

    return counter.value;
  }

  async findByUserId(userId: string): Promise<Patient | null> {
    let patientDoc = await PatientModel.findOne({ userId });
    if (!patientDoc) return null;
    return this.toDomain(patientDoc);
  }

  async findAllByUserId(userId: string): Promise<Patient[] | null> {
    let patientDoc = await PatientModel.find({
      userId: userId,
    });

    if (!patientDoc) return [];
    return patientDoc.map((doc) => this.toDomain(doc));
  }

  protected toDomain(doc: IPatient): Patient {
    return Patient.create(
      {
        id: doc._id.toString(),
        userId: doc.userId.toString(),
        displayName: doc.displayName,
        imageUrl: doc.imageUrl,
        relation: doc.relation,
        dateOfBirth: doc.dateOfBirth,
        gender: doc.gender,
        medicalInformation: doc.medicalInformation
          ? {
              bloodGroup: doc.medicalInformation.bloodGroup ?? "",
              allergies: doc.medicalInformation.allergies ?? [],
              chronicConditions: doc.medicalInformation.chronicConditions ?? [],
            }
          : {
              bloodGroup: "",
              allergies: [],
              chronicConditions: [],
            },
        emergencyContact: doc.emergencyContact
          ? {
              name: doc.emergencyContact.name ?? "",
              phone: doc.emergencyContact.phone ?? "",
              relationship: doc.emergencyContact.relationship ?? "",
            }
          : {
              name: "",
              phone: "",
              relationship: "",
            },
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.patientNumber,
    );
  }
}
