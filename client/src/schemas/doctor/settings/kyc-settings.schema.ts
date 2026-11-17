import { FILE_SIZE_2MB } from "@/constants/clinical-registration.constant";
import { documentField, pictureField } from "@/schemas/base.schema";
import { z } from "zod";

export const panDetailsSchema = z.object({
  section: z.literal("KYC_PAN").default("KYC_PAN"),
  panNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Please enter a valid 10-character PAN number (e.g. ABCDE1234F)",
    ),
  nameOnPan: z
    .string()
    .trim()
    .min(3, "Name on PAN must be at least 3 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  panCardDoc: z.union([
    z.string().url("Invalid PAN document URL"),
    documentField("PAN Card Document", FILE_SIZE_2MB, 2),
  ]),
  status: z
    .enum(["VERIFIED", "PENDING", "REJECTED", "NOT_SUBMITTED"])
    .default("NOT_SUBMITTED"),
});

export const bankAccountDetailsSchema = z
  .object({
    section: z.literal("KYC_BANK").default("KYC_BANK"),
    accountHolderName: z
      .string()
      .trim()
      .min(3, "Account holder name is required"),
    accountNumber: z
      .string()
      .trim()
      .regex(
        /^\d{9,18}$/,
        "Bank account number must be between 9 and 18 digits",
      ),
    confirmAccountNumber: z.string().trim().optional(),
    ifscCode: z
      .string()
      .trim()
      .toUpperCase()
      .regex(
        /^[A-Z]{4}0[A-Z0-9]{6}$/,
        "Please enter a valid 11-character IFSC code (e.g. HDFC0001234)",
      ),
    bankName: z.string().trim().min(2, "Bank name is required"),
    accountType: z.enum(["SAVINGS", "CURRENT"]).default("SAVINGS"),
    status: z
      .enum(["VERIFIED", "PENDING", "REJECTED", "NOT_SUBMITTED"])
      .default("NOT_SUBMITTED"),
  })
  .refine(
    (data) => {
      if (data.confirmAccountNumber) {
        return data.accountNumber === data.confirmAccountNumber;
      }
      return true;
    },
    {
      message: "Account numbers do not match",
      path: ["confirmAccountNumber"],
    },
  );

export const aadhaarDetailsSchema = z.object({
  section: z.literal("KYC_AADHAAR").default("KYC_AADHAAR"),
  aadhaarNumber: z
    .string()
    .trim()
    .regex(
      /^\d{4}\s?\d{4}\s?\d{4}$/,
      "Please enter a valid 12-digit Aadhaar number",
    ),
  nameOnAadhaar: z
    .string()
    .trim()
    .min(3, "Name on Aadhaar must be at least 3 characters"),
  aadhaarCardDoc: z.union([
    z.string().url("Invalid PAN document URL"),
    documentField("Aadhaar Card Document", FILE_SIZE_2MB, 2),
  ]),
  status: z
    .enum(["VERIFIED", "PENDING", "REJECTED", "NOT_SUBMITTED"])
    .default("NOT_SUBMITTED"),
});

export const kycSettingsSchema = z.object({
  section: z.literal("KYC").default("KYC"),
  pan: panDetailsSchema,
  bankAccount: bankAccountDetailsSchema,
  aadhaar: aadhaarDetailsSchema,
});

export type PanFormInput = z.input<typeof panDetailsSchema>;
export type PanFormValues = z.output<typeof panDetailsSchema>;
export type BankAccountFormInput = z.input<typeof bankAccountDetailsSchema>;
export type BankAccountFormValues = z.output<typeof bankAccountDetailsSchema>;
export type BankAccountData = z.infer<typeof bankAccountDetailsSchema>;
export type AadhaarFormInput = z.input<typeof aadhaarDetailsSchema>;
export type AadhaarFormValues = z.output<typeof aadhaarDetailsSchema>;
export type KycFormValues = z.infer<typeof kycSettingsSchema>;
