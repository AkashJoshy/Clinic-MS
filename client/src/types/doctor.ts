import type { User } from "./user";
import type { BaseAddress, Gender, Patient } from "./patient";
import type {
  DayOfWeek,
  ApprovalStatus,
  AccountStatus,
  ServiceMode,
  ImageData,
  PlainUrl,
} from "./common";
import type { DoctorClinic, Session, WeeklySchedule } from "./doctor-clinic";
import type { Clinic } from "./clinic";
import type { DepartmentData } from "./admin";

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
  createdAt: string | null;
  updatedAt: string | null;
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

export type DoctorProfileData = {
  address: BaseAddress | null;

  clinic: Pick<Clinic, "id" | "name" | "about" | "location"> & {
    clinicAddress: BaseAddress | null;
  };

  department: Pick<DepartmentData, "id" | "name"> | null;

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
    medicalLicenceDoc: PlainUrl;
    profilePicture: PlainUrl;
  };

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
};

export type DoctorInfo = {
  user: Pick<User, "email" | "phone" | "isActive" | "isBlocked"> | null;
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
  clinic: Pick<Clinic, "id" | "name" | "about" | "location"> & {
    clinicAddress: BaseAddress | null;
  };
  doctorClinic: Pick<
    DoctorClinic,
    | "id"
    | "type"
    | "consultationFee"
    | "schedule"
    | "slotDuration"
    | "timeZone"
    | "isActive"
    | "updatedAt"
  >;
} & {
  address: BaseAddress | null;
} & {
  department: Pick<DepartmentData, "id" | "name"> | null;
};

export interface DoctorStatusUpdateDto {
  id: string;
  reviewMessage: string;
}

type DoctorProfCard = Pick<
  Doctor,
  | "doctorCode"
  | "bio"
  | "displayName"
  | "averageRating"
  | "totalReviews"
  | "status"
> & {
  profilePicture: {
    url: string;
  };
};

export interface DoctorProfileCardProps {
  doctor: DoctorProfCard;
  department: { id: string; name: string } | null;
  isBlocked: boolean;
}

type DoctorQualificationCard = Pick<
  Doctor,
  | "specialization"
  | "qualification"
  | "experienceYears"
  | "gender"
  | "createdAt"
> & {
  registrationDoc: {
    url: string;
  };
} & {
  medicalLicenceDoc: {
    url: string;
  };
};

export interface DoctorQualificationsCardProps {
  doctor: DoctorQualificationCard;
  onViewDocument: (url: string) => void;
  formatDate: (date: any) => string;
}

type ClinicCard = Pick<Clinic, "name" | "about"> & {
  clinicAddress: BaseAddress | null;
};

type DoctorClinicCard = Pick<
  DoctorClinic,
  "consultationFee" | "slotDuration" | "type" | "isActive"
>;

export interface DoctorClinicCardProps {
  clinic: ClinicCard;
  doctorClinic: DoctorClinicCard;
  address: BaseAddress | null;
}

export type DoctorProffesionalDetails = Pick<
  Doctor,
  | "id"
  | "bio"
  | "gender"
  | "experienceYears"
  | "languages"
  | "qualification"
  | "specialization"
  | "licenceNumber"
> & { userId: string };

export type DoctorConsultationDetails = Pick<
  DoctorClinic,
  | "consultationFee"
  | "isActive"
  | "clinicId"
  | "id"
  | "doctorId"
  | "type"
  | "slotDuration"
  | "timeZone"
> & { userId: string };


export interface WeeklyScheduleCalendarProps {
  weeklySchedule: WeeklySchedule[];
  onSessionClick?: (session: Session, date: Date) => void;
}