import type { DoctorDocumentField } from "../types/admin.types.ts";
import type {
  AddDoctorProps,
  DoctorStatus,
  SubscriptionDetails,
  UpdateDoctorProps,
} from "../types/doctor.types.ts";
import type {
  Gender,
  ImageData,
  VerifyImageData,
} from "../types/shared.types.ts";

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
    public registrationDoc: VerifyImageData,
    public medicalLicenceDoc: VerifyImageData,
    public status: DoctorStatus,
    public subscription: {
      current: SubscriptionDetails | null;
      history: SubscriptionDetails[];
    },
    public reviewedAt: Date | null,
    public reviewedMessage: string | null,
    public reviewedReason: string | null,
    public fieldsToReupload: string[],
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
        status: "PENDING",
      },
      data.medicalLicenceDoc ?? {
        publicId: "",
        url: "",
        status: "PENDING",
      },
      data.status ?? "PENDING",
      data.subscription ?? {
        current: null,
        history: [],
      },
      data.reviewedAt ?? null,
      data.reviewedMessage ?? null,
      data.reviewedReason ?? null,
      data.fieldsToReupload ?? [],
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  static register(data: Partial<Omit<AddDoctorProps, "status">>): Doctor {
    return this.create({ ...data, status: "PENDING" });
  }

  isPending() {
    return this.status === "PENDING";
  }

  approve(reviewMessage: string) {
    if (this.status !== "PENDING") {
      throw new Error("Only pending doctors can be approved.");
    }

    this.status = "APPROVED";
    this.reviewedMessage = reviewMessage;
    this.reviewedAt = new Date();
  }

  reject(
    reviewMessage: string,
    reviewedReason: string,
    fieldsToReupload: string[],
  ) {
    if (this.status !== "PENDING") {
      throw new Error("Only pending doctors can be rejected.");
    }

    this.status = "REJECTED";
    this.reviewedMessage = reviewMessage;
    this.reviewedAt = new Date();
    this.reviewedReason = reviewedReason;
    this.fieldsToReupload = fieldsToReupload;
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
    return (this.profilePicture = profilePicture);
  }

  isDocumentMatch(documentField: DoctorDocumentField, url: string) {
    if (this[documentField].url === url) {
      return true;
    }

    return false;
  }

  verifyDocument(documentField: DoctorDocumentField, url: string) {
    const isMatched = this.isDocumentMatch(documentField, url);

    if (!isMatched) {
      throw new Error("Document doesn't exist");
    }

    if (this[documentField].status === "APPROVED") {
      throw new Error("Document is already Approved");
    }

    this[documentField].status = "APPROVED";
  }

  rejectDocument(documentField: DoctorDocumentField, url: string) {
    const isMatched = this.isDocumentMatch(documentField, url);

    if (!isMatched) {
      throw new Error("Document doesn't exist");
    }

    if (this[documentField].status === "REJECTED") {
      throw new Error("Document is already Rejected");
    }
    this[documentField].status = "REJECTED";
  }

  update(
    data: UpdateDoctorProps
  ) {
    if (data.displayName !== undefined) {
      this.displayName = data.displayName;
    }

    if (data.bio !== undefined) {
      this.bio = data.bio;
    }

    if (data.languages !== undefined) {
      this.languages = data.languages;
    }

    if (data.gender !== undefined) {
      this.gender = data.gender;
    }

    if (data.departmentId !== undefined) {
      this.departmentId = data.departmentId;
    }

    if (data.specialization !== undefined) {
      this.specialization = data.specialization;
    }

    if (data.qualification !== undefined) {
      this.qualification = data.qualification;
    }

    if (data.experienceYears !== undefined) {
      this.experienceYears = data.experienceYears;
    }

    if (data.licenceNumber !== undefined) {
      this.licenceNumber = data.licenceNumber;
    }

    if (data.profilePicture !== undefined) {
      this.profilePicture = data.profilePicture;
    }

    if (data.registrationDoc !== undefined) {
      const registrationDocument = {
        ...data.registrationDoc,
        status: "PENDING",
      };
      this.registrationDoc = registrationDocument as VerifyImageData;
    }

    if (data.medicalLicenceDoc !== undefined) {
      const medicalLicenceDocument = {
        ...data.medicalLicenceDoc,
        status: "PENDING",
      } as VerifyImageData;
      this.medicalLicenceDoc = medicalLicenceDocument;
    }

    if (data.fieldsToReupload !== undefined) {
      this.fieldsToReupload = data.fieldsToReupload;
    }
  }

  submit() {
    this.status = "PENDING";
  }
}
