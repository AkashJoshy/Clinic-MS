import {
  INITIAL_AADHAAR,
  INITIAL_BANK,
  INITIAL_PAN,
} from "../constants/kyc.constants.ts";
import type {
  AadhaarDetails,
  AadhaarInput,
  AddKycProps,
  BankAccountDetails,
  BankInput,
  KycSection,
  KycStatus,
  KycUserRole,
  PanDetails,
  PanInput,
  SectionState,
} from "../types/kyc.types.ts";

export class Kyc {
  constructor(
    public id: string | null,
    public userId: string | null,
    public role: KycUserRole | null,
    public pan: PanDetails,
    public bank: BankAccountDetails,
    public aadhaar: AadhaarDetails,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<AddKycProps>): Kyc {
    return new Kyc(
      data.id ?? null,
      data.userId ?? null,
      data.role ?? null,
      data.pan ?? { ...INITIAL_PAN },
      data.bank ?? { ...INITIAL_BANK },
      data.aadhaar ?? { ...INITIAL_AADHAAR },
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  static register(userId: string, role: KycUserRole): Kyc {
    return this.create({ userId, role });
  }

  submitPan(input: PanInput) {
    this.assertEditable(this.pan);
    this.pan = {
      ...this.pan,
      ...input,
      panNumber: input.panNumber.trim(),
      nameOnPan: input.nameOnPan.trim(),
      status: "PENDING",
      rejectionReason: null,
    };
    this.touch();
  }

  submitBank(input: BankInput) {
    this.assertEditable(this.bank);
    this.bank = {
      ...this.bank,
      ...input,
      accountHolderName: input.accountHolderName.trim(),
      accountNumber: input.accountNumber.trim(),
      ifscCode: input.ifscCode.trim().toUpperCase(),
      bankName: input.bankName.trim(),
      status: "PENDING",
      rejectionReason: null,
    };
    this.touch();
  }

  submitAadhaar(input: AadhaarInput) {
    this.assertEditable(this.aadhaar);
    this.aadhaar = {
      ...this.aadhaar,
      ...input,
      aadhaarNumber: input.aadhaarNumber.replace(/\s/g, ""),
      nameOnAadhaar: input.nameOnAadhaar.trim(),
      status: "PENDING",
      rejectionReason: null,
    };
    this.touch();
  }

  verify(section: KycSection) {
    const target = this.getSection(section);
    if (target.status !== "PENDING") {
      throw new Error(`Only pending ${section} details can be verified`);
    }
    target.status = "VERIFIED";
    target.rejectionReason = null;
    this.touch();
  }

  reject(section: KycSection, reason: string) {
    const target = this.getSection(section);
    if (target.status !== "PENDING") {
      throw new Error(`Only pending ${section} details can be rejected`);
    }
    if (!reason.trim()) {
      throw new Error("Rejection reason is required");
    }
    target.status = "REJECTED";
    target.rejectionReason = reason.trim();
    this.touch();
  }

  isFullyVerified(): boolean {
    return [this.pan, this.bank, this.aadhaar].every(
      (s) => s.status === "VERIFIED",
    );
  }

  overallStatus(): KycStatus {
    const statuses = [this.pan, this.bank, this.aadhaar].map((s) => s.status);
    if (statuses.every((s) => s === "VERIFIED")) return "VERIFIED";
    if (statuses.some((s) => s === "REJECTED")) return "REJECTED";
    if (statuses.some((s) => s === "PENDING")) return "PENDING";
    return "NOT_SUBMITTED";
  }

  maskedPan(): string {
    return this.mask(this.pan.panNumber, 2, 1);
  }

  maskedAadhaar(): string {
    return this.mask(this.aadhaar.aadhaarNumber, 0, 4);
  }

  maskedAccountNumber(): string {
    return this.mask(this.bank.accountNumber, 0, 4);
  }

  private getSection(section: KycSection): SectionState {
    switch (section) {
      case "KYC_PAN":
        return this.pan;
      case "KYC_BANK":
        return this.bank;
      case "KYC_AADHAAR":
        return this.aadhaar;
    }
  }

  private assertEditable(section: SectionState) {
    if (section.status === "VERIFIED") {
      throw new Error(`${section.section} is already verified and locked`);
    }
  }

  isPending(section: KycSection) {
    return this.getSection(section).status === "PENDING"
  }

  private mask(value: string, keepStart: number, keepEnd: number): string {
    if (value.length <= keepStart + keepEnd) return value;
    const middle = "X".repeat(value.length - keepStart - keepEnd);
    return (
      value.slice(0, keepStart) + middle + value.slice(value.length - keepEnd)
    );
  }

  private touch() {
    this.updatedAt = new Date();
  }

}
