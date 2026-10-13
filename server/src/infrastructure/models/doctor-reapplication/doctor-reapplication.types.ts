import type { Document, Types } from "mongoose";
import type { DoctorReapplicationStatus } from "../../../domain/types/doctor.types.ts";


export interface IDoctorReapplication extends Document {
  doctorId: Types.ObjectId | null;
  tokenHash: string;
  tokenExpiresAt: Date;
  status: DoctorReapplicationStatus;
  fieldsToReupload: string[];
  reviewMessage: string | null;
  reviewedReason: string | null;
  submittedAt: Date | null;
  reviewedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}