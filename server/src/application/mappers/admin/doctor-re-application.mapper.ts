import type { Clinic } from "../../../domain/entities/clinic.entity.ts";
import type { Doctor } from "../../../domain/entities/doctor.entity.ts";
import type {
  AddressToUpdateDto,
  DoctorReapplicationToUpdateDto,
} from "../../dto/doctor.dto.ts";

export class DoctorReapplicationMapper {
  static toDoctorUpdates(
    doctorId: string,
    doctor: DoctorReapplicationToUpdateDto,
  ) {
    const {
      bio,
      phone,
      fullName,
      experienceYears,
      gender,
      licenceNumber,
      qualification,
      specialization,
    } = doctor.data;

    const { profilePicture, medicalLicenceDoc, doctorRegistrationDoc } =
      doctor.files;

    return {
      id: doctorId!,
      ...(bio !== undefined && { bio }),
      ...(phone !== undefined && { phone }),
      ...(fullName !== undefined && { displayName: fullName }),
      ...(experienceYears !== undefined && { experienceYears }),
      ...(gender !== undefined && { gender }),
      ...(licenceNumber !== undefined && { licenceNumber }),
      ...(qualification !== undefined && { qualification }),
      ...(specialization !== undefined && { specialization }),
      ...(profilePicture !== undefined && { profilePicture }),
      ...(medicalLicenceDoc !== undefined && { medicalLicenceDoc }),
      ...(doctorRegistrationDoc !== undefined && { doctorRegistrationDoc }),
    };
  }

  static toClinicUpdates(clinic: DoctorReapplicationToUpdateDto) {
    const { about, altPhone, clinicName, registrationNumber } = clinic.data;
    const { clinicRegistrationDoc, establishmentLicenceDoc } = clinic.files;

    return {
      ...(about !== undefined && { about }),
      ...(altPhone !== undefined && { altPhone }),
      ...(clinicName !== undefined && { name: clinicName }),
      ...(registrationNumber !== undefined && { registrationNumber }),
      ...(clinicRegistrationDoc !== undefined && { clinicRegistrationDoc }),
      ...(establishmentLicenceDoc !== undefined && { establishmentLicenceDoc }),
    };
  }

  static toAddressUpdates(address: AddressToUpdateDto) {
    const { city, addressLine, pincode } = address.data;

    return {
      ...(city !== undefined && { city }),
      ...(addressLine !== undefined && { addressLine }),
      ...(pincode !== undefined && { pincode }),
    };
  }
  
   static toDoctorPersistenceUpdates(
    doctor: Doctor,
  ) {
    return {
      bio: doctor.bio,
      displayName: doctor.displayName,
      experienceYears: doctor.experienceYears,
      gender: doctor.gender,
      licenceNumber: doctor.licenceNumber,
      qualification: doctor.qualification,
      specialization: doctor.specialization,
      profilePicture: doctor.profilePicture,
      registrationDoc: doctor.registrationDoc,
      medicalLicenceDoc: doctor.medicalLicenceDoc,
      status: doctor.status,
    };
  }

  static toClinicPersistenceUpdates(clinic: Clinic) {
  return {
    name: clinic.name,
    about: clinic.about,
    altPhone: clinic.altPhone,
    registrationNumber: clinic.registrationNumber,
    registrationDoc: clinic.registrationDoc,
    establishmentLicenceDoc: clinic.establishmentLicenceDoc,
  };
}

}
