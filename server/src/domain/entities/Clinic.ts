import type { RegisterClinicProps } from "../types/clinic.types.js";
import type { ApprovalStatus, ImageData } from "../types/shared.types.ts";

export class Clinic {
  constructor(
    public id: string | null,
    public name: string,
    public registrationNumber: string,
    public about: string,
    public altPhone: string | null,
    public yearOfEstablished: number,
    public registrationDoc: ImageData,
    public establishmentLicenceDoc: ImageData,
    public location: {
      type: "Point";
      coordinates: [longitude: number, latitude: number];
    },
    public status: ApprovalStatus,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: RegisterClinicProps): Clinic {
    return new Clinic(
      data.id,
      data.name,
      data.registrationNumber,
      data.about,
      data.altPhone ?? null,
      data.yearOfEstablished,
      data.registrationDoc,
      data.establishmentLicenceDoc,
      {
        type: data.location.type ?? "Point",
        coordinates: [
          data.location.coordinates[0] ?? 0,
          data.location.coordinates[1] ?? 0,
        ],
      },
      data.status ?? "PENDING",
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  isApproved() {
    return this.status === "APPROVED";
  }
}
