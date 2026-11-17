import type {
  BankAccountType,
  KycStatus,
} from "../../domain/types/kyc.types.ts";
import type { VerifiedStatus } from "../../domain/types/shared.types.ts";

export interface UpdateDoctorPanDetailsDto {
  dateOfBirth: string;
  nameOnPan: string;
  panNumber: string;
  section: "KYC_PAN";
  status: KycStatus;
}

export interface DoctorPanDetailsResponseDto {
  maskedPanNumber: string;
  panImageUrl: string;
  verificationStatus: KycStatus;
  updatedAt: Date;
}

export interface UpdateDoctorBankDetailsDto {
  section: "KYC_BANK";
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  accountType: BankAccountType;
  bankName: string;
  ifscCode: string;
  status: KycStatus;
}

export interface DoctorBankDetailsResponseDto {
  accountHolderName: string;
  accountNumber: string;
  accountType: BankAccountType;
  bankName: string;
  ifscCode: string;
  status: KycStatus;
  updatedAt: Date;
}

export interface UpdateDoctorAadhaarDetailsDto {
  section: "KYC_AADHAAR";
  aadhaarNumber: string;
  nameOnAadhaar: string;
}

export interface DoctorAadhaarDetailsResponseDto {
  nameOnAadhaar: string;
  aadhaarNumber: string;
  aadhaarCardDoc: string;
  verificationStatus: KycStatus;
  updatedAt: Date;
}

export interface GetDoctorPanDetailsResponseDto {
  section: "KYC_PAN";
  maskedPanNumber: string;
  panNumber: string
  nameOnPan: string;
  dateOfBirth: string;
  panCardDoc: string;
  status: KycStatus;
  rejectionReason: string | null;
  updatedAt: Date;
}

export interface GetDoctorBankDetailsResponseDto {
  section: "KYC_BANK";
  accountHolderName: string;
  maskedAccountNumber: string;
  accountNumber: string
  bankName: string;
  accountType: BankAccountType;
  ifscCode: string;
  status: KycStatus;
  rejectionReason: string | null;
  updatedAt: Date;
}

export interface GetDoctorAadhaarDetailsResponseDto {
  section: "KYC_AADHAAR";
  nameOnAadhaar: string;
  maskedAadhaarNumber: string;
  aadhaarNumber: string;
  aadhaarCardDoc: string;
  status: KycStatus;
  rejectionReason: string | null;
  updatedAt: Date;
}

export interface GetDoctorKycDetailsResponseDto {
  pan: GetDoctorPanDetailsResponseDto;
  bank: GetDoctorBankDetailsResponseDto;
  aadhaar: GetDoctorAadhaarDetailsResponseDto;
}