import type { User } from "./user";
import type { BaseAddress, Gender, Patient } from "./patient";
import type {
  DayOfWeek,
  ApprovalStatus,
  AccountStatus,
  ServiceMode,
  ImageData,
  PlainUrl,
  VerifyPlainUrl,
} from "./common";
import type { DoctorClinic, Session, WeeklySchedule } from "./doctor-clinic";
import type { Clinic } from "./clinic";
import type { DepartmentData } from "./admin";

export interface Doctor {
  id: string | null;
  userId: string | null;
  displayName: string;
  doctorCode: string;
  profilePicture: PlainUrl;
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
  registrationDoc: VerifyPlainUrl;
  medicalLicenceDoc: VerifyPlainUrl;
  status: DoctorStatus;
  subscription: Subscription;
  reviewedAt: Date | null;
  reviewedMessage: string | null;
  reviewedReason: string | null;
  fieldsToReupload: string[];
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

export interface RejectedDoctor
  extends Omit<Doctor, "userId" | "subscription"> {
  reviewedReason: string | null;
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
    | "registrationDoc"
    | "medicalLicenceDoc"
    | "profilePicture"
  > & {
    registrationDoc: VerifyPlainUrl;
  } & {
    medicalLicenceDoc: VerifyPlainUrl;
  } & {
    profilePicture: PlainUrl;
  };
  clinic: Pick<Clinic, "id" | "name" | "about" | "location" | "status"> & {
    clinicAddress: BaseAddress | null;
  } & {
    establishmentLicenceDoc: VerifyPlainUrl;
  } & {
    registrationDoc: VerifyPlainUrl;
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

export interface DoctorRejectDto {
  doctorId: string;
  rejectedReason: string;
  rejectedMessage: string;
  fields: string[];
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
  | "id"
  | "status"
  | "specialization"
  | "qualification"
  | "experienceYears"
  | "gender"
  | "createdAt"
> & {
  registrationDoc: VerifyPlainUrl;
} & {
  medicalLicenceDoc: VerifyPlainUrl;
};

export interface DoctorQualificationsCardProps {
  doctor: DoctorQualificationCard;
  onViewDocument: (url: string) => void;
  formatDate: (date: any) => string;
  onDocumentAction?: (
    name: string,
    status: "VERIFY" | "REJECT",
    id: string,
    documentRelatedTo: "CLINIC" | "DOCTOR",
    documentField:
      | "registrationDoc"
      | "medicalLicenceDoc"
      | "establishmentLicenceDoc",
    url: string,
  ) => void;
}

type ClinicCard = Pick<
  Clinic,
  "name" | "about" | "id" | "location" | "status"
> & {
  clinicAddress: BaseAddress | null;
} & {
  establishmentLicenceDoc: VerifyPlainUrl;
} & {
  registrationDoc: VerifyPlainUrl;
};

type DoctorClinicCard = Pick<
  DoctorClinic,
  "consultationFee" | "slotDuration" | "type" | "isActive"
>;

export interface DocumentDto {
  id: string;
  name: string;
  action: "VERIFY" | "REJECT";
  documentRelatedTo: "CLINIC" | "DOCTOR";
  documentField:
    | "registrationDoc"
    | "medicalLicenceDoc"
    | "establishmentLicenceDoc";
  url: string;
}

export interface DoctorClinicCardProps {
  clinic: ClinicCard;
  doctor: Omit<
    Doctor,
    | "registrationDoc"
    | "medicalLicenceDoc"
    | "profilePicture"
  > & {
    registrationDoc: VerifyPlainUrl;
  } & {
    medicalLicenceDoc: VerifyPlainUrl;
  } & {
    profilePicture: PlainUrl;
  };
  onViewDocument: (url: string) => void;
  doctorClinic: DoctorClinicCard;
  onDocumentAction?: (
    name: string,
    action: "VERIFY" | "REJECT",
    id: string,
    documentRelatedTo: "CLINIC" | "DOCTOR",
    documentField:
      | "registrationDoc"
      | "medicalLicenceDoc"
      | "establishmentLicenceDoc",
    url: string,
  ) => void;
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

export type DoctorReapplicationStatus =
  | "PENDING"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED";

export interface DoctorReapplication {
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

export interface GetReapplicationDetails {
  doctor: Doctor;
  clinicAddress: BaseAddress;
  fieldsToReupload: DoctorReapplication["fieldsToReupload"];
  reviewMessage: string | null;
  rejectionReason: string | null;
}

export interface FieldConfig {
  name: string;
  label: string;
  description?: string;
  type?: string;
  placeholder: string;
  accept?: string;
  icon: React.ComponentType<{ className?: string }>;
  required?: boolean;
}

export interface FormState {
  fullName?: string;
  licenseNumber?: string;
  specialty?: string;
  email?: string;
  phone?: string;
  reason?: string;
}
