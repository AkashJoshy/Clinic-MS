import type {
  AadhaarDetails,
  BankAccountDetails,
  PanDetails,
} from "../types/kyc.types.ts";

export const INITIAL_PAN: PanDetails = {
  section: "KYC_PAN",
  panNumber: "",
  nameOnPan: "",
  dateOfBirth: "",
  panCardDoc: {
    publicId: "",
    url: "",
  },
  status: "NOT_SUBMITTED",
  rejectionReason: null,
};

export const INITIAL_BANK: BankAccountDetails = {
  section: "KYC_BANK",
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
  bankName: "",
  accountType: "SAVINGS",
  status: "NOT_SUBMITTED",
  rejectionReason: null,
};

export const INITIAL_AADHAAR: AadhaarDetails = {
  section: "KYC_AADHAAR",
  aadhaarNumber: "",
  nameOnAadhaar: "",
  aadhaarCardDoc: {
    publicId: "",
    url: ""
  },
  status: "NOT_SUBMITTED",
  rejectionReason: null,
};

export const KYC_STATUSES = ["VERIFIED", "PENDING", "REJECTED", "NOT_SUBMITTED"];

export const BANK_ACCOUNT_TYPE = ["SAVINGS", "CURRENT"] as const
