import type { RegisterClinicProps } from "../types/clinic.types.ts";
import type { ApprovalStatus, ImageData } from "../types/shared.types.ts";

export class Clinic {
  constructor(
    public id: string | null,
    public name: string,
    public registrationNumber: string,
    public about: string,
    public altPhone: string | null,
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
      },
      data.establishmentLicenceDoc ?? {
        publicId: "",
        url: "",
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
}
