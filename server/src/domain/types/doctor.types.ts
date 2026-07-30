import type { ApprovalStatus, Gender, ImageData } from "./shared.types.ts";

export type DoctorStatus = ApprovalStatus | "SUSPENDED";

export interface SubscriptionDetails {
  subscriptionId: string | null;
  startedAt: Date;
  expiredAt: Date;
  status: boolean;
}

export type Subscription = {
  current: SubscriptionDetails | null,
  history: SubscriptionDetails[]
}

export interface AddDoctorProps {
  id: string | null;
  userId: string | null;
  displayName: string;
  doctorCode: string;
  bio: string | null;
  profilePicture: ImageData,
  languages: string[];
  gender: Gender;
  departmentId: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenceNumber: string;
  averageRating: number;
  totalReviews: number;
  registrationDoc: ImageData;
  medicalLicenceDoc: ImageData;
  status: DoctorStatus;
  subscription: Subscription;
  reviewedAt: Date | null;
  reviewedMessage: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
