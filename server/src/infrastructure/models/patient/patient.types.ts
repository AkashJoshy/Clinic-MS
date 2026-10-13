import type { Types, Document } from "mongoose";
import type { RelationToPatient } from "../../../domain/constants/patient.constants.ts";
import type { EmergencyContact, MedicalInformation } from "../../../domain/types/patient.types.ts";
import type { Gender, ImageData } from "../../../domain/types/shared.types.ts";


export interface IPatient extends Document {
  userId: Types.ObjectId;
  displayName: string;
  patientNumber: string;
  imageUrl: ImageData;
  relation: RelationToPatient;
  medicalInformation: MedicalInformation;
  emergencyContact: EmergencyContact;
  dateOfBirth: string;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
}