import type { RelationToPatient } from "../constants/patient.constants.ts";
import type Patient from "../entities/Patient.ts";
import type { Gender, ImageData } from "./shared.types.ts";

export interface RegisterPatientProps {
  id: null | string;
  userId: string;
  displayName: string;
  imageUrl: ImageData;
  relation: RelationToPatient;
  medicalInformation: MedicalInformation;
  emergencyContact: EmergencyContact;
  dateOfBirth: string;
  gender: Gender;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface MedicalInformation {
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: RelationToPatient;
}

export type BasePatient = Pick<
  Patient,
  | "id"
  | "userId"
  | "displayName"
  | "imageUrl"
  | "patientNumber"
  | "relation"
  | "medicalInformation"
  | "emergencyContact"
  | "dateOfBirth"
  | "gender"
  | "createdAt"
  | "updatedAt"
>;
