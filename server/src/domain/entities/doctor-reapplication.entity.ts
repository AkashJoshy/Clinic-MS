import { AlreadyExistsError } from "../errors/user-already-exists.error.ts";
import type { DoctorReapplicationProps, DoctorReapplicationStatus } from "../types/doctor.types.ts";

export class DoctorReapplication {
  constructor(
    public readonly id: string | null,
    public readonly doctorId: string | null,
    public tokenHash: string,
    public tokenExpiresAt: Date,
    public status: DoctorReapplicationStatus,
    public fieldsToReupload: string[],
    public reviewMessage: string | null,
    public reviewedReason: string | null,
    public submittedAt: Date | null,
    public reviewedAt: Date | null,
    public readonly createdAt: Date | null,
    public readonly updatedAt: Date | null,
  ) {}

  static create(props: Partial<DoctorReapplicationProps>): DoctorReapplication {
    return new DoctorReapplication(
      props.id ?? null,
      props.doctorId!,
      props.tokenHash ?? "",
      props.tokenExpiresAt!,
      props.status ?? "PENDING",
      props.fieldsToReupload ?? [],
      props.reviewMessage ?? null,
      props.reviewedReason ?? null,
      props.submittedAt ?? null,
      props.reviewedAt ?? null,
      props.createdAt ?? null,
      props.updatedAt ?? null,
    );
  }

  updateToken(hashedToken: string, tokenExpiresAt: Date) {
    this.tokenHash = hashedToken;
    this.tokenExpiresAt = tokenExpiresAt;
  }

  isTokenExpired(): boolean {
    return this.tokenExpiresAt.getTime() <= Date.now();
  }

  isPending(): boolean {
    return this.status === "PENDING";
  }

  isSubmitted(): boolean {
    return this.status === "SUBMITTED";
  }

  isApproved(): boolean {
    return this.status === "APPROVED";
  }

  isRejected(): boolean {
    return this.status === "REJECTED";
  }

  isExpired(): boolean {
    return this.status === "EXPIRED";
  }

  submit() {
    if (this.status === "PENDING") {
      this.status = "SUBMITTED"
      this.reviewedAt = new Date()
    }

    if (this.status === "APPROVED") {
      throw new AlreadyExistsError("Reapplication is already approved")
    }

    if (this.status === "EXPIRED") {
      throw new AlreadyExistsError("Re-application is expired")
    }

    if (this.status === "SUBMITTED") {
      throw new AlreadyExistsError("Re-application is alreday submitted")
    }

    if (this.status === "REJECTED") {
      throw new AlreadyExistsError("Re-application is alreday rejected")
    }

  }

}
