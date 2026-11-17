import type { ImageData } from "./shared.types.ts";

export type KycStatus = "VERIFIED" | "PENDING" | "REJECTED" | "NOT_SUBMITTED";
export type BankAccountType = "SAVINGS" | "CURRENT";
export type KycUserRole = "PATIENT" | "DOCTOR" | "ADMIN";
export type KycSection = "KYC_PAN" | "KYC_BANK" | "KYC_AADHAAR";
export type SectionState = PanDetails | BankAccountDetails | AadhaarDetails;


export interface PanDetails {
  section: "KYC_PAN";
  panNumber: string;
  nameOnPan: string;
  dateOfBirth: string;
  panCardDoc: ImageData;
  status: KycStatus;
  rejectionReason: string | null;
}

export interface BankAccountDetails {
  section: "KYC_BANK";
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: BankAccountType;
  status: KycStatus;
  rejectionReason: string | null;
}

export interface AadhaarDetails {
  section: "KYC_AADHAAR";
  aadhaarNumber: string;
  nameOnAadhaar: string;
  aadhaarCardDoc: ImageData;
  status: KycStatus;
  rejectionReason: string | null;
}

export interface AddKycProps {
  id: string;
  userId: string;
  role: KycUserRole;
  pan: PanDetails;
  bank: BankAccountDetails;
  aadhaar: AadhaarDetails;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type PanInput = Omit<PanDetails, "section" | "status" | "rejectionReason">;
export type BankInput = Omit<
  BankAccountDetails,
  "section" | "status" | "rejectionReason"
>;
export type AadhaarInput = Omit<
  AadhaarDetails,
  "section" | "status" | "rejectionReason"
>;