import type { User } from "./user";
import type { BaseAddress, Gender } from "./patient";
import type {
  DayOfWeek,
  ApprovalStatus,
  AccountStatus,
  ServiceMode,
  ImageData,
  PlainUrl,
} from "./common";
import type { DoctorClinic, WeeklySchedule } from "./doctor-clinic";
import type { Clinic } from "./clinic";

export interface Doctor {
  id: string | null;
  userId: string | null;
  displayName: string;
  doctorCode: string;
  profilePicture: ImageData;
  bio: string | null;
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

export type Certificate = {
  url: string;
  publicId: string;
};

export interface UpdateDoctorStatusDto {
  doctorId: string;
  status: ApprovalStatus | AccountStatus;
  reviewedAt: Date;
  reviewMessage?: string;
}

type PublicUser = Omit<
  User,
  | "password"
  | "phone"
  | "email"
  | "role"
  | "isEmailVerified"
  | "isBlocked"
  | "isActive"
  | "isTwoFactorenabled"
  | "createdAt"
  | "updatedAt"
>;

export type DoctorStatus = ApprovalStatus | "SUSPENDED";

export type DoctorClinicType = ServiceMode;

export interface Session {
  startTime: string;
  endTime: string;
}

export interface Schedule {
  dayOfWeek: DayOfWeek;
  sessions: Session[];
}

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

export type DoctorDetails = DoctorClinic & {
  user: PublicUser | null;
};

export type DoctorInfo = {
  doctor: Omit<
    Doctor,
    | "reviewedAt"
    | "reviewedMessage"
    | "registrationDoc"
    | "medicalLicenceDoc"
    | "profilePicture"
    | "subscription"
  > & {
    registrationDoc: PlainUrl;
  } & {
    medicalLicenceDoc: PlainUrl;
  } & {
    profilePicture: PlainUrl;
  };
  clinic: Pick<Clinic, "id" | "name" | "about" | "location">;
  doctorClinic: Pick<
    DoctorClinic,
    | "id"
    | "type"
    | "consultationFee"
    | "schedule"
    | "slotDuration"
    | "timeZone"
    | "isActive"
  >;
} & {
  address: BaseAddress | null;
} & {
  user: Pick<User, "id" | "email" | "phone">;
}
