import { MongooseBaseRepository } from "./base/mongoose-base.repository.js";
import type { IDoctorRepository } from "../../domain/repositories/IDoctorRepository.ts";
import { DoctorModel, type IDoctor } from "../models/doctor.model.ts";
import CounterModel from "../models/counter.model.ts";
import { Doctor } from "../../domain/entities/Doctor.ts";

export class MongooseDoctorRepository
  extends MongooseBaseRepository<Doctor, IDoctor>
  implements IDoctorRepository
{
  constructor() {
    super(DoctorModel);
  }

  async getDoctorNumber(): Promise<number |  null> {
    const doctorNumber = await CounterModel.findOneAndUpdate({
      name: "doctorNumber"
    }, {
      $inc: { value: 1 }
    }, {
      returnDocument: "after",
      upsert: true
    })

    if (!doctorNumber) return null
    return doctorNumber.value
  }

  protected toDomain(doc: IDoctor): Doctor {
  return Doctor.create({
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    displayName: doc.displayName,
    doctorCode: doc.doctorCode,
    bio: doc.bio,
    profilePicture: doc.profilePicture,
    languages: doc.languages,
    gender: doc.gender,
    departmentId: doc.departmentId.toString(),
    specialization: doc.specialization,
    qualification: doc.qualification,
    experienceYears: doc.experienceYears,
    licenceNumber: doc.licenceNumber,
    averageRating: doc.averageRating,
    totalReviews: doc.totalReviews,
    registrationDoc: doc.registrationDoc,
    medicalLicenceDoc: doc.medicalLicenceDoc,
    status: doc.status,
    reviewedAt: doc.reviewedAt,
    reviewedMessage: doc.reviewedMessage,
    createdAt: doc.createdAt ?? null,
    updatedAt: doc.updatedAt ?? null,
    subscription: {
      current: doc.subscription.current,
      history: doc.subscription.history
    }
  });
}

protected toPersistence(entity: Doctor): Partial<IDoctor> {
  return {
    userId: entity.userId!,
    displayName: entity.displayName,
    doctorCode: entity.doctorCode,
    bio: entity.bio,
    profilePicture: entity.profilePicture,
    languages: entity.languages,
    gender: entity.gender,
    departmentId: entity.departmentId,
    specialization: entity.specialization,
    qualification: entity.qualification,
    experienceYears: entity.experienceYears,
    licenceNumber: entity.licenceNumber,
    averageRating: entity.averageRating,
    totalReviews: entity.totalReviews,
    registrationDoc: entity.registrationDoc,
    medicalLicenceDoc: entity.medicalLicenceDoc,
    status: entity.status,
    subscription: {
      current: entity.subscription.current,
      history: entity.subscription.history
    },
    reviewedAt: entity.reviewedAt,
    reviewedMessage: entity.reviewedMessage,
  };
}

}
