import type { Clinic } from "../../domain/entities/clinic.entity.ts";
import type { Department } from "../../domain/entities/department.entity.ts";
import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";
import type User from "../../domain/entities/user.entity.ts";
import type { DoctorReapplicationFiles } from "../../domain/types/doctor.types.ts";
import type {
  ApprovalPlainUrl,
  Gender,
  PlainUrl,
  ServiceMode,
} from "../../domain/types/shared.types.ts";
import type { BaseAddress } from "./patient.dto.ts";
import type { DoctorReapplication } from "../../domain/entities/doctor-reapplication.entity.ts";
import type { SafeUser } from "./auth.dto.ts";
import type { SafeDoctorClinic } from "./doctor-clinic.dto.ts";
import type { Address } from "../../domain/entities/address.entity.ts";

export interface ClinicDetails {
  id: string;
  name: string;
}

export interface ReviewDoctorUpdateDto {
  id: string;
  rejectedReason: string;
  rejectedMessage: string;
  fields: string[];
}

export type SafeDoctor = Omit<
  Doctor,
  | "create"
  | "isPending"
  | "approve"
  | "register"
  | "reject"
  | "addLanguages"
  | "updateProfessionalDetails"
  | "updateProfilePicture"
  | "isDocumentMatch"
  | "verifyDocument"
  | "rejectDocument"
  | "update"
  | "submit"
>;

export type BasicDoctorInfo = {
  user: Pick<SafeUser, "email" | "phone" | "isActive" | "isBlocked"> | null;
  doctor: Omit<
    SafeDoctor,
    | "userId"
    | "profilePicture"
    | "registrationDoc"
    | "medicalLicenceDoc"
    | "fieldsToReupload"
    | "subscription"
  >;
  doctorClinic: Pick<
    SafeDoctorClinic,
    | "id"
    | "type"
    | "consultationFee"
    | "weeklySchedule"
    | "exceptions"
    | "slotRules"
    | "timeZone"
    | "isActive"
    | "updatedAt"
  >[];
  department: Pick<Department, "id" | "name"> | null;
};

export type DoctorInfo = Omit<BasicDoctorInfo, "doctorClinic"> & {
  doctor: BasicDoctorInfo["doctor"] & {
    profilePicture: PlainUrl;
  };
  doctorClinicDetails: (BasicDoctorInfo["doctorClinic"][number] & {
    clinic: Pick<
      Clinic,
      "id" | "name" | "about" | "location" | "status"
    > | null;
    clinicAddress: BaseAddress | null;
  })[];
};

export type AdminDoctorFullInfoDto = Omit<
  DoctorInfo,
  "doctorClinicDetails" | "doctor"
> & {
  doctor: DoctorInfo["doctor"] & {
    registrationDoc: ApprovalPlainUrl;
    medicalLicenceDoc: ApprovalPlainUrl;
  };
  doctorClinicDetails: (Omit<
    DoctorInfo["doctorClinicDetails"][number],
    "clinic" | "clinicAddress"
  > & {
    clinic:
      | (NonNullable<DoctorInfo["doctorClinicDetails"][number]["clinic"]> & {
          registrationDoc: ApprovalPlainUrl;
          establishmentLicenceDoc: ApprovalPlainUrl;
        })
      | null;
    clinicAddress: BaseAddress | null;
  })[];
  address: BaseAddress | null;
};

export type AdminDoctorFullInfoResponseDto = AdminDoctorFullInfoDto

export type PatientDoctorDetailsDto = Omit<
  AdminDoctorFullInfoDto,
  "doctorClinicDetails"
> & {
  doctorClinicDetails: DoctorClinicDetailsBasicResponseDto[];
};

export type AdminDoctorInfoDto = Omit<
  DoctorInfo,
  "doctorClinicDetails" | "doctor"
> & {
  doctor: DoctorInfo["doctor"] & {
    registrationDoc: ApprovalPlainUrl;
    medicalLicenceDoc: ApprovalPlainUrl;
  };
  doctorClinicDetails: (Omit<
    DoctorInfo["doctorClinicDetails"][number],
    "clinic" | "clinicAddress" | "exceptions" | "slotRules" | "weeklySchedule"
  > & {
    clinic:
      | (NonNullable<DoctorInfo["doctorClinicDetails"][number]["clinic"]> & {
          registrationDoc: ApprovalPlainUrl;
          establishmentLicenceDoc: ApprovalPlainUrl;
        })
      | null;
    clinicAddress: BaseAddress | null;
  })[];
  address: BaseAddress | null;
};

export type AdminDoctorInfoResponseDto = AdminDoctorInfoDto;

export type DoctorDetailsCardResponseDto = {
  user: BasicDoctorInfo["user"] | null;
  department: AdminDoctorInfoDto["department"] | null;
  doctor: Pick<
    AdminDoctorInfoDto["doctor"],
    | "status"
    | "displayName"
    | "doctorCode"
    | "gender"
    | "createdAt"
    | "reviewedAt"
    | "reviewedMessage"
    | "departmentId"
    | "id"
    | "profilePicture"
    | "medicalLicenceDoc"
    | "registrationDoc"
  >;
  doctorClinicDetails: Pick<
    DoctorInfo["doctorClinicDetails"][number],
    | "id"
    | "isActive"
    | "clinic"
    | "clinicAddress"
    | "consultationFee"
    | "timeZone"
    | "type"
  >[];
  address: AdminDoctorInfoDto["address"] | null;
};

export type PatientDoctorDetailsResponseDto = {
  doctor: Pick<
    AdminDoctorInfoDto["doctor"],
    | "averageRating"
    | "displayName"
    | "totalReviews"
    | "profilePicture"
    | "experienceYears"
    | "gender"
    | "status"
    | "id"
  >;
  doctorClinicDetails: (Pick<
    DoctorInfo["doctorClinicDetails"][number],
    "id" | "consultationFee" | "isActive" | "timeZone" | "type"
  > & {
    clinic: Pick<
      NonNullable<AdminDoctorInfoDto["doctorClinicDetails"][number]["clinic"]>,
      "name" | "id" | "status"
    > | null;
  })[];
  address: AdminDoctorInfoDto["address"] | null;
  department: BasicDoctorInfo["department"];
};

export type DoctorClinicDetailsBasicDto =
  AdminDoctorFullInfoDto["doctorClinicDetails"][number];

export type DoctorClinicDetailsBasicResponseDto = Omit<
  PatientDoctorDetailsResponseDto["doctorClinicDetails"][number],
  "weeklySchedule"
>;

export type DoctorDetailsResponseDto = {
  user: User;
  doctor: Doctor;
  doctorClinic: SafeDoctorClinic;
  clinic: Clinic;
  address: Address;
};

export type DoctorReapplicationResponseDto = {
  reapplication: DoctorReapplication;
};

export type DoctorProfileInfoResponseDto = Omit<AdminDoctorInfoDto, "user">;

export interface DoctorRegisterDto {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  gender: Gender;
  departmentId: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenceNumber: string;
  password: string;
  confirmPassword: string;
  clinicName: string;
  registrationNumber: string;
  about?: string;
  altPhone?: string;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  latitude: number;
  longitude: number;
  mode: ServiceMode;
  consultationFee: number;
  doctorProfilePicture?: Express.Multer.File[];
  clinicRegistrationDoc?: Express.Multer.File[];
  establishmentLicenceDoc?: Express.Multer.File[];
  medicalLicenceDoc?: Express.Multer.File[];
  doctorRegistrationDoc?: Express.Multer.File[];
}
//111
export type DoctorProfessionalDto = Pick<
  SafeDoctor,
  | "id"
  | "bio"
  | "gender"
  | "experienceYears"
  | "languages"
  | "qualification"
  | "specialization"
  | "licenceNumber"
  | "updatedAt"
> & { userId: string };

export type DoctorProfessionalResponseDto = DoctorProfessionalDto

export type UpdateDoctorDto = Partial<
  Pick<
    SafeDoctor,
    | "bio"
    | "displayName"
    | "experienceYears"
    | "gender"
    | "licenceNumber"
    | "qualification"
    | "specialization"
  >
> & {
  id?: string | undefined;
  phone?: string;
  profilePicture?: Express.Multer.File[] | undefined;
  doctorRegistrationDoc?: Express.Multer.File[] | undefined;
  medicalLicenceDoc?: Express.Multer.File[] | undefined;
};

export type UpdateDoctorResponseDto = {
  doctor: Doctor;
  user: User;
};

export type DoctorConsultationDto = Pick<
  DoctorClinic,
  | "consultationFee"
  | "isActive"
  | "clinicId"
  | "id"
  | "doctorId"
  | "type"
  | "timeZone"
> & { userId: string; updatedAt: Date | null };

export type DoctorConsultationResponseDto = DoctorConsultationDto;

export type DoctorConsultationMapperDto = {
  doctorClinic: SafeDoctorClinic;
  userId: string;
  doctorUpdatedAt: SafeDoctor["updatedAt"];
};

export interface ReapplicationResponseDto {
  doctor: SafeDoctor;
  clinicAddress: BaseAddress;
  fieldsToReupload: DoctorReapplication["fieldsToReupload"];
  reviewMessage: string | null;
  rejectionReason: string | null;
}

type ReapplicationData = Partial<DoctorRegisterDto>;

export interface ReapplicationUpdateDto {
  data: ReapplicationData;
  files: DoctorReapplicationFiles;
  token: string;
}

export interface UpdateDoctorEntityDto {
  doctor: Doctor;
  user: User;
  updates: UpdateDoctorDto;
}

export interface DoctorReapplicationToUpdateDto {
  data: ReapplicationUpdateDto["data"];
  files: ReapplicationUpdateDto["files"];
}

export interface AddressToUpdateDto {
  data: ReapplicationUpdateDto["data"];
}

export interface DoctorExistsDto {
  doctorId: string;
  clinicId: string;
  doctorClinicId: string;
}

export interface DoctorExistsResponseDto {
  doctor: Doctor;
  user: User;
  clinic: Clinic;
  doctorClinic: DoctorClinic;
}
