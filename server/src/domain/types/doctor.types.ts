import type {
  ApprovalStatus,
  Gender,
  ImageData,
  VerifyImageData,
} from "./shared.types.ts";

export type DoctorStatus = ApprovalStatus | "SUSPENDED";

export interface SubscriptionDetails {
  subscriptionId: string | null;
  startedAt: Date;
  expiredAt: Date;
  status: boolean;
}

export type Subscription = {
  current: SubscriptionDetails | null;
  history: SubscriptionDetails[];
};

export interface AddDoctorProps {
  id: string | null;
  userId: string | null;
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
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type DoctorReapplicationStatus =
  | "PENDING"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED";

export interface DoctorReapplicationProps {
  id: string | null;
  doctorId: string | null;
  tokenHash: string;
  tokenExpiresAt: Date;
  status: DoctorReapplicationStatus;
  fieldsToReupload: string[];
  reviewMessage: string | null;
  reviewedReason: string | null;
  submittedAt: Date | null;
  reviewedAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type UpdateDoctorProps = Partial<
  Omit<
    AddDoctorProps,
    "profilePicture" | "registrationDoc" | "medicalLicenceDoc"
  > & {
    profilePicture?: ImageData;
    registrationDoc?: ImageData;
    medicalLicenceDoc?: ImageData;
  }
>

export type DoctorReapplicationFiles = {
  profilePicture?: Express.Multer.File[];
  doctorRegistrationDoc?: Express.Multer.File[];
  clinicRegistrationDoc?: Express.Multer.File[];
  medicalLicenceDoc?: Express.Multer.File[];
  establishmentLicenceDoc?: Express.Multer.File[];
};