import { Schema, model, type Document, type Types } from "mongoose";

import type { Gender, ImageData } from "../../domain/types/shared.types.ts";
import { GENDER, RELATIONS, type RelationToPatient } from "../../domain/constants/patient.constants.ts";
import type { EmergencyContact, MedicalInformation } from "../../domain/types/patient.types.ts";

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

const medicalInformationSchema = new Schema<MedicalInformation>({
  bloodGroup: {
    type: String,
  },
  allergies: [String],
  chronicConditions: [String],
});

const emergencyContactSchema = new Schema<EmergencyContact>({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  relationship: {
    type: String,
    enum: RELATIONS,
  },
});

const imageSchema = new Schema<ImageData>({
  publicId: String,
  url: String
})

const patientSchema = new Schema<IPatient>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    patientNumber: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    imageUrl: imageSchema,
    relation: {
      type: String,
      required: true,
      enum: RELATIONS,
    },
    medicalInformation: {
      type: medicalInformationSchema,
    },
    emergencyContact: {
      type: emergencyContactSchema,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: GENDER,
    },
  },
  { timestamps: true },
);

const PatientModel = model<IPatient>("Patient", patientSchema);
export default PatientModel;
