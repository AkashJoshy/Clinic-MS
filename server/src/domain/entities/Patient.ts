import type { RelationToPatient } from "../constants/patient.constants.ts";
import type {
  RegisterPatientProps,
  EmergencyContact,
  MedicalInformation,
} from "../types/patient.types.ts";
import type { Gender, ImageData } from "../types/shared.types.ts";


export default class Patient {
  constructor(
    public id: null | string,
    public userId: string,
    public displayName: string,
    public patientNumber: string,
    public imageUrl: ImageData,
    public relation: RelationToPatient,
    public medicalInformation: MedicalInformation,
    public emergencyContact: EmergencyContact | null,
    public dateOfBirth: string,
    public gender: Gender,
    public createdAt: Date | null,
    public updatedAt: Date | null
  ) {}

  static create(data: Partial<RegisterPatientProps>, patientCode: string): Patient {
    return new Patient(
      data.id ?? null,
      data.userId ?? "",
      data.displayName ?? "",
      patientCode,
      data.imageUrl ?? {
        publicId: '',
        url: ''
      },
      data.relation ?? "SELF",
      data.medicalInformation ?? {
        bloodGroup: "",
        allergies: [],
        chronicConditions: [],
      },
      data.emergencyContact ?? {
        name: "",
        phone: "",
        relationship: "",
      },
      data.dateOfBirth ?? "",
      data.gender ? data.gender : "PREFER NOT TO SAY",
      data.createdAt ?? null,
      data.updatedAt ?? null,
    );
  }

  static createSelf(data: Partial<RegisterPatientProps>, patientCode: string): Patient {
    return this.create({
      ...data,
      relation: "SELF",
      medicalInformation: {
        bloodGroup: "",
        allergies: [],
        chronicConditions: []
      }
    }, patientCode)
  }
  
  static createDependent(data: Partial<RegisterPatientProps>, patientCode: string): Patient {
    return this.create(data, patientCode)
  }

  isSelf() {
    return this.relation === "SELF"
  }
  
  updateProfilePicture(imageUrl: ImageData) {
    return this.imageUrl = imageUrl
  }

}
