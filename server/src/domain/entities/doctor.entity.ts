import type {
  AddDoctorProps,
  DoctorStatus,
  SubscriptionDetails,
} from "../types/doctor.types.ts";
import type { Gender, ImageData } from "../types/shared.types.ts";

export class Doctor {
  constructor(
    public id: string | null,
    public userId: string | null,
    public displayName: string,
    public doctorCode: string,
    public bio: string | null,
    public profilePicture: ImageData,
    public languages: string[],
    public gender: Gender,
    public departmentId: string,
    public specialization: string,
    public qualification: string,
    public experienceYears: number,
    public licenceNumber: string,
    public averageRating: number,
    public totalReviews: number,
    public registrationDoc: ImageData,
    public medicalLicenceDoc: ImageData,
    public status: DoctorStatus,
    public subscription: {
      current: SubscriptionDetails | null;
      history: SubscriptionDetails[];
    },
    public reviewedAt: Date | null,
    public reviewedMessage: string | null,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(data: Partial<AddDoctorProps>): Doctor {
    return new Doctor(
      data.id ?? null,
      data.userId ?? null,
      data.displayName ?? "",
      data.doctorCode!,
      data.bio ?? "",
      data.profilePicture ?? {
        publicId: "",
        url: "",
      },
      data.languages ?? [],
      data.gender ?? "PREFER NOT TO SAY",
      data.departmentId!,
      data.specialization ?? "",
      data.qualification ?? "",
      data.experienceYears ?? 0,
      data.licenceNumber!,
      data.averageRating ?? 0,
      data.totalReviews ?? 0,
      data.registrationDoc ?? {
        publicId: "",
        url: "",
      },
      data.medicalLicenceDoc ?? {
        publicId: "",
        url: "",
      },
      data.status ?? "PENDING",
      data.subscription ?? {
        current: null,
        history: [],
      },
      data.reviewedAt ?? null,
      data.reviewedMessage ?? null,
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  static register(data: Partial<Omit<AddDoctorProps, "status">>): Doctor {
    return this.create({ ...data, status: "PENDING" });
  }

  approve(reviewMessage: string) {
    if (this.status !== "PENDING") {
      throw new Error("Only pending doctors can be approved.");
    }

    this.status = "APPROVED";
    this.reviewedMessage = reviewMessage;
    this.reviewedAt = new Date();
  }

  reject(reviewMessage: string) {
    if (this.status !== "PENDING") {
      throw new Error("Only pending doctors can be rejected.");
    }

    this.status = "REJECTED";
    this.reviewedMessage = reviewMessage;
    this.reviewedAt = new Date();
  }

  addLanguages(languages: string[]): string[] {
    if (languages.length === 0) return [];
    this.languages = languages;
    return this.languages;
  }

  updateProfessionalDetails(
    data: Pick<
      AddDoctorProps,
      | "bio"
      | "experienceYears"
      | "gender"
      | "licenceNumber"
      | "qualification"
      | "specialization"
    >,
  ) {
    this.bio = data.bio;
    this.experienceYears = data.experienceYears;
    this.gender = data.gender;
    this.licenceNumber = data.licenceNumber;
    this.qualification = data.qualification;
    this.specialization = data.specialization;
  }

  updateProfilePicture(profilePicture: ImageData) {
    return this.profilePicture = profilePicture
  }

}
