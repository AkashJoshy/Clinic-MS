import type { AadhaarDetails, BankAccountDetails, PanDetails } from "./doctor-settings";

export type KycStatus = "VERIFIED" | "PENDING" | "REJECTED" | "NOT_SUBMITTED";
export type BankAccountType = "SAVINGS" | "CURRENT";
export type KycUserRole = "PATIENT" | "DOCTOR" | "ADMIN";
export type KycSection = "KYC_PAN" | "KYC_BANK" | "KYC_AADHAAR";
export type SectionState = PanDetails | BankAccountDetails | AadhaarDetails;


export interface PanDetailsData {
  section: "KYC_PAN";
  maskedPanNumber: string;
  panNumber: string;
  nameOnPan: string;
  dateOfBirth: string;
  panCardDoc: string;
  status: KycStatus;
  rejectionReason: string | null;
  updatedAt: Date;
}

export interface BankDetailsData {
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

export interface AadhaarDetailsData {
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
  pan: PanDetailsData
  bank: BankDetailsData;
  aadhaar: AadhaarDetailsData;
}