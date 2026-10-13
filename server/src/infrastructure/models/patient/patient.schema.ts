import { Schema } from "mongoose";
import type { EmergencyContact, MedicalInformation } from "../../../domain/types/patient.types.ts";
import { GENDER, RELATIONS } from "../../../domain/constants/patient.constants.ts";
import type { IPatient } from "./patient.types.ts";
import { ImageDataSchema } from "../shared/shared.schema.ts";

export const medicalInformationSchema = new Schema<MedicalInformation>({
  bloodGroup: {
    type: String,
  },
  allergies: [String],
  chronicConditions: [String],
});

export const emergencyContactSchema = new Schema<EmergencyContact>({
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

export const patientSchema = new Schema<IPatient>(
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
    imageUrl: ImageDataSchema,
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