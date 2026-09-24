import type { ResourceType } from "../../domain/types/user.types.ts";
import { uploadToCloudinary } from "../../infrastructure/cloudinary/cloudinary.uploader.ts";
import type { IUpdateClinicService } from "../i-service/i-update-clinic.service.ts";
import { Clinic } from "../../domain/entities/clinic.entity.ts";
import type {
  UpdateClinicDto,
  UpdateClinicEntityDto,
} from "../dto/clinic.dto.ts";

export class UpdateClinicService implements IUpdateClinicService {
  async execute(data: UpdateClinicEntityDto): Promise<Clinic> {
    const { clinic, updates } = data;
    const {
      about,
      altPhone,
      name,
      registrationNumber,
      clinicRegistrationDoc,
      establishmentLicenceDoc,
    } = updates;

    let clinicRegistrationDocument;
    if (clinicRegistrationDoc && clinicRegistrationDoc?.[0]) {
      const mimeType = clinicRegistrationDoc[0].mimetype;
      const type = mimeType.includes("image") ? "doctor/images" : "doctor/docs";
      const resourceType: ResourceType = mimeType.includes("image")
        ? "image"
        : "raw";
      clinicRegistrationDocument = await uploadToCloudinary(
        clinicRegistrationDoc[0].buffer,
        type,
        resourceType,
      );
    }

    let establishmentLicenceDocument;
    if (establishmentLicenceDoc && establishmentLicenceDoc?.[0]) {
      const mimeType = establishmentLicenceDoc[0].mimetype;
      const type = mimeType.includes("image") ? "doctor/images" : "doctor/docs";
      const resourceType: ResourceType = mimeType.includes("image")
        ? "image"
        : "raw";
      establishmentLicenceDocument = await uploadToCloudinary(
        establishmentLicenceDoc[0].buffer,
        type,
        resourceType,
      );
    }

    clinic.update({
      ...(name !== undefined && { name }),
      ...(altPhone !== undefined && { altPhone }),
      ...(about !== undefined && { about }),
      ...(registrationNumber !== undefined && { registrationNumber }),
      ...(clinicRegistrationDocument !== undefined && {
        registrationDoc: clinicRegistrationDocument,
      }),
      ...(establishmentLicenceDocument !== undefined && {
        establishmentLicenceDoc: establishmentLicenceDocument,
      }),
    });

    return clinic;
  }
}
