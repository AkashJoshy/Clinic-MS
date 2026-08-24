import { Clinic } from "../../domain/entities/Clinic.ts";
import type { IClinicRepository } from "../../domain/repositories/IClinicRepository.ts";
import { type IClinic, ClinicModel } from "../models/clinic.model.ts";
import { BaseRepository } from "./base/base.repository.ts";

export class ClinicRepository
  extends BaseRepository<Clinic, IClinic>
  implements IClinicRepository
{
  constructor() {
    super(ClinicModel);
  }
  protected toDomain(doc: IClinic): Clinic {
    return Clinic.create({
      id: doc._id.toString(),
      name: doc.name,
      registrationNumber: doc.registrationNumber,
      about: doc.about,
      altPhone: doc.altPhone,
      registrationDoc: doc.registrationDoc,
      establishmentLicenceDoc: doc.establishmentLicenceDoc,
      location: {
        type: doc.location.type,
        coordinates: [doc.location.coordinates[0], doc.location.coordinates[1]],
      },
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toPersistence(entity: Clinic): Partial<IClinic> {
    return {
      name: entity.name,
      registrationNumber: entity.registrationNumber,
      about: entity.about,
      altPhone: entity.altPhone,
      registrationDoc: entity.registrationDoc,
      establishmentLicenceDoc: entity.establishmentLicenceDoc,
      location: {
        type: entity.location.type,
        coordinates: [
          entity.location.coordinates[0],
          entity.location.coordinates[1],
        ],
      },
      status: entity.status,
      createdAt: entity.createdAt ?? null,
      updatedAt: entity.updatedAt ?? null,
    };
  }

  async findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<Clinic | null> {
    let doc = await ClinicModel.findOne({ registrationNumber });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findNearClinics(
    longitude: number,
    latitude: number,
    radius: number,
  ): Promise<Clinic[]> {
    let docs = await ClinicModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "distanceMetres",
          maxDistance: radius * 1000,
          spherical: true,
          query: { status: "ACTIVE" },
        },
      },
    ]);

    return docs.map((doc) => this.toDomain(doc));
  }
}
