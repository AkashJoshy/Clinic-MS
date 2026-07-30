import type { Clinic } from "../../domain/entities/Clinic.ts";
import type { ServiceMode } from "../../domain/types/shared.types.ts";
import type { ImageDto } from "./auth.dto.ts";
import type { BaseAddress } from "./patient.dto.ts";
import type {
  ClinicDoctorDetails,
  DoctorProfileResponseDto,
} from "./shared.dto.ts";

export interface RegisterClinicDto {
  clinicType: ServiceMode;
  clinicName: string;
  tagline: string;
  registrationNumber: string;
  about: string;
  departmentIds: string[];
  altPhone?: string | null;
  addressLine: string;
  district: string;
  pincode: string;
  city: string;
  country: string;
  state: string;
  yearEstablished: string;
  latitude: string;
  longitude: string;
  docs: {
    clinicPhoto: ImageDto;
    clinicRegistrationDoc: ImageDto;
    medicalEstablishmentDoc: ImageDto;
    idProofDoc: ImageDto;
  };
}

export interface ClinicDoctorProfileResponseDto extends DoctorProfileResponseDto {
  doctor: ClinicDoctorDetails;
}

type BaseClinic = Omit<
  Clinic,
  | "userId"
  | "reviewedAt"
  | "reviewMessage"
  | "logoUrl"
  | "idProofUrl"
  | "medicalLicenceUrl"
  | "registrationDocUrl"
> & {
  logoUrl: string
} & {
  idProofUrl: string
} & {
  medicalLicenceUrl: string
} & {
  registrationDocUrl: string
};


export type ClinicProfile = BaseClinic &  {
  address: BaseAddress | null;
}

