import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type {
  CloudinaryUploadResult,
  ResourceType,
} from "../../domain/types/user.types.ts";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../infrastructure/cloudinary/cloudinary.uploader.ts";
import type { IUpdateDoctorService } from "../i-service/i-update-doctor.service.ts";
import type {
  UpdateDoctorEntityDto,
  UpdateDoctorResponseDto,
} from "../dto/doctor.dto.ts";

export class UpdateDoctorService implements IUpdateDoctorService {
  async execute(data: UpdateDoctorEntityDto): Promise<UpdateDoctorResponseDto> {
    const { doctor, user, updates } = data;

    const {
      bio,
      displayName,
      doctorRegistrationDoc,
      experienceYears,
      gender,
      licenceNumber,
      medicalLicenceDoc,
      profilePicture,
      qualification,
      specialization,
      id,
      phone,
    } = updates;

    let doctorProfilePicture;
    if (profilePicture && profilePicture?.[0]) {
      const mimeType = profilePicture[0].mimetype;
      const type = mimeType.includes("image") ? "doctor/images" : "doctor/docs";
      const resourceType: ResourceType = mimeType.includes("image")
        ? "image"
        : "raw";

      const existedType = doctor.profilePicture.url.includes("image")
        ? "image"
        : doctor.profilePicture.url.includes("raw")
          ? "raw"
          : doctor.profilePicture.url.includes("video")
            ? "video"
            : "auto";
      await deleteFromCloudinary(doctor.profilePicture.publicId, existedType);

      doctorProfilePicture = await uploadToCloudinary(
        profilePicture[0].buffer,
        type,
        resourceType,
      );
    }

    let doctorRegistrationDocument;
    if (doctorRegistrationDoc && doctorRegistrationDoc?.[0]) {
      const existedType = doctor.registrationDoc.url.includes("image")
        ? "image"
        : doctor.registrationDoc.url.includes("raw")
          ? "raw"
          : doctor.registrationDoc.url.includes("video")
            ? "video"
            : "auto";

      await deleteFromCloudinary(doctor.registrationDoc.publicId, existedType);

      const mimeType = doctorRegistrationDoc[0].mimetype;
      const type = mimeType.includes("image") ? "doctor/images" : "doctor/docs";
      const resourceType: ResourceType = mimeType.includes("image")
        ? "image"
        : "raw";
      doctorRegistrationDocument = await uploadToCloudinary(
        doctorRegistrationDoc[0].buffer,
        type,
        resourceType,
      );
    }

    let medicalLicenceDocument;
    if (medicalLicenceDoc && medicalLicenceDoc?.[0]) {
       const existedType = doctor.medicalLicenceDoc.url.includes("image")
        ? "image"
        : doctor.medicalLicenceDoc.url.includes("raw")
          ? "raw"
          : doctor.medicalLicenceDoc.url.includes("video")
            ? "video"
            : "auto";
            
      await deleteFromCloudinary(doctor.medicalLicenceDoc.publicId, existedType);

      const mimeType = medicalLicenceDoc[0].mimetype;
      const type = mimeType.includes("image") ? "doctor/images" : "doctor/docs";
      const resourceType: ResourceType = mimeType.includes("image")
        ? "image"
        : "raw";
      medicalLicenceDocument = await uploadToCloudinary(
        medicalLicenceDoc[0].buffer,
        type,
        resourceType,
      )
    }

    doctor.update({
      ...(bio !== undefined && { bio }),
      ...(displayName !== undefined && { displayName }),
      ...(experienceYears !== undefined && { experienceYears }),
      ...(gender !== undefined && { gender }),
      ...(licenceNumber !== undefined && { licenceNumber }),
      ...(qualification !== undefined && { qualification }),
      ...(specialization !== undefined && { specialization }),
      ...(doctorProfilePicture !== undefined && {
        profilePicture: doctorProfilePicture,
      }),
      ...(doctorRegistrationDocument !== undefined && {
        registrationDoc: doctorRegistrationDocument,
      }),
      ...(medicalLicenceDocument !== undefined && {
        medicalLicenceDoc: medicalLicenceDocument!,
      }),
    });

    if (displayName) user.updateName(displayName);

    if (phone) user.updatePhone(phone);

    return {
      doctor: doctor,
      user: user,
    };
  }
}
