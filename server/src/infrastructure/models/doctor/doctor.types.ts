import type { Document, Types } from "mongoose";
import type { Gender, ImageData, VerifyImageData } from "../../../domain/types/shared.types.ts";
import type { DoctorStatus, Subscription } from "../../../domain/types/doctor.types.ts";

export interface IDoctor extends Document {
  userId: Types.ObjectId | null
  displayName: string;
  doctorCode: string;
  bio: string | null;
  profilePicture: ImageData;
  languages: string[];
  gender: Gender;
  departmentId: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenceNumber: string;
  averageRating: number;
  totalReviews: number;
  registrationDoc: VerifyImageData;
  medicalLicenceDoc: VerifyImageData;
  status: DoctorStatus;
  subscription: Subscription;
  reviewedAt: Date | null;
  reviewedMessage: string | null;
  reviewedReason: string | null;
  fieldsToReupload: string[];
  createdAt: Date;
  updatedAt: Date;
}