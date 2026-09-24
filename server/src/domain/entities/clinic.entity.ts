import type { ClinicDocumentField } from "../types/admin.types.ts";
import type {
  RegisterClinicProps,
  UpdateClinicProps,
} from "../types/clinic.types.ts";
import type { ApprovalStatus, VerifyImageData } from "../types/shared.types.ts";

export class Clinic {
  constructor(
    public id: string | null,
    public name: string,
    public registrationNumber: string,
    public about: string,
    public altPhone: string | null,
    public registrationDoc: VerifyImageData,
    public establishmentLicenceDoc: VerifyImageData,
    public location: {
      type: "Point";
      coordinates: [longitude: number, latitude: number];
    },
    public status: ApprovalStatus,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<RegisterClinicProps>): Clinic {
    return new Clinic(
      data.id ?? null,
      data.name ?? "",
      data.registrationNumber!,
      data.about ?? "",
      data.altPhone ?? null,
      data.registrationDoc ?? {
        publicId: "",
        url: "",
        status: "PENDING",
      },
      data.establishmentLicenceDoc ?? {
        publicId: "",
        url: "",
        status: "PENDING",
      },
      {
        type: data?.location?.type ?? "Point",
        coordinates: [
          data?.location?.coordinates[0] ?? 0,
          data?.location?.coordinates[1] ?? 0,
        ],
      },
      data.status ?? "PENDING",
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  static register(data: Partial<Omit<RegisterClinicProps, "status">>): Clinic {
    return this.create({ ...data, status: "PENDING" });
  }

  approve() {
    this.status = "APPROVED";
  }

  isApproved() {
    return this.status === "APPROVED";
  }

  isDocumentMatch(documentField: ClinicDocumentField, url: string) {
    if (this[documentField].url === url) {
      return true;
    }

    return false;
  }

  verifyDocument(documentField: ClinicDocumentField, url: string) {
    const isMatched = this.isDocumentMatch(documentField, url);

    if (!isMatched) {
      throw new Error("Document doesn't exist");
    }

    if (this[documentField].status === "APPROVED") {
      throw new Error("Document is already Approved");
    }

    this[documentField].status = "APPROVED";
  }

  rejectDocument(documentField: ClinicDocumentField, url: string) {
    const isMatched = this.isDocumentMatch(documentField, url);

    if (!isMatched) {
      throw new Error("Document doesn't exist");
    }

    if (this[documentField].status === "REJECTED") {
      throw new Error("Document is already Rejected");
    }
    this[documentField].status = "REJECTED";
  }

  update(data: UpdateClinicProps) {
    if (data.name !== undefined) {
      this.name = data.name;
    }

    if (data.altPhone !== undefined) {
      this.altPhone = data.altPhone;
    }

    if (data.about !== undefined) {
      this.about = data.about;
    }

    if (data.registrationNumber !== undefined) {
      this.registrationNumber = data.registrationNumber;
    }

    if (data.registrationDoc !== undefined) {
      this.registrationDoc = {
        ...data.registrationDoc,
        status: "PENDING",
      };
    }

    if (data.establishmentLicenceDoc !== undefined) {
      this.establishmentLicenceDoc = {
        ...data.establishmentLicenceDoc,
        status: "PENDING",
      };
    }
  }
  
}
