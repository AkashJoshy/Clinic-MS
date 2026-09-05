import { Address } from "../../../../domain/entities/address.ts";
import { Clinic } from "../../../../domain/entities/clinic.ts";
import { Doctor } from "../../../../domain/entities/doctor.ts";
import { DoctorClinic } from "../../../../domain/entities/doctor-clinic.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.ts";
import { ValidationError } from "../../../../domain/errors/validation.error.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { ModeRoleRef } from "../../../../domain/types/user.types.ts";
import { uploadToCloudinary } from "../../../../infrastructure/cloudinary/cloudinary.uploader.ts";
import type { DoctorRegisterDto } from "../../../dto/doctor.dto.ts";
import type { IUserCreationService } from "../../../IService/i-user-creation.service.ts";
import type { IDoctorRegisterUseCase } from "../../../repositories/doctor/i-doctor-register.usecase.ts";

export class DoctorRegisterUseCase implements IDoctorRegisterUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    readonly _doctorClinicRepository: IDoctorClinicRepository,
    readonly _clinicRepository: IClinicRepository,
    readonly _addressRepository: IAddressRepository,
    readonly _userCreationService: IUserCreationService,
  ) {}

  async execute(data: DoctorRegisterDto): Promise<void> {
    const {
      fullName,
      email,
      phone,
      bio,
      gender,
      departmentId,
      specialization,
      qualification,
      experienceYears,
      licenceNumber,
      password,
      clinicName,
      registrationNumber,
      about,
      altPhone,
      addressLine,
      country,
      state,
      city,
      pincode,
      latitude,
      longitude,
      mode,
      consultationFee,
      doctorProfilePicture,
      clinicRegistrationDoc,
      establishmentLicenceDoc,
      medicalLicenceDoc,
      doctorRegistrationDoc,
    } = data;

    const user = await this._userCreationService.execute({
      id: null,
      fullName: fullName,
      phone: phone,
      email: email,
      password: password,
      role: "DOCTOR",
    });

    if (!user) {
      throw new NotFoundError("Doctor");
    }

    const doctor = await this._doctorRepository.findOneBy({ userId: user.id });

    if (doctor) {
      throw new AlreadyExistsError("Doctor Alreday exists");
    }

    const code = await this._doctorRepository.getDoctorNumber();

    if (!code) {
      throw new InternalServerError();
    }

    if (
      !doctorProfilePicture?.[0] ||
      !clinicRegistrationDoc?.[0] ||
      !establishmentLicenceDoc?.[0] ||
      !medicalLicenceDoc?.[0] ||
      !doctorRegistrationDoc?.[0]
    ) {
      throw new ValidationError("Required files missing");
    }

    const [
      doctorProfilePictureResult,
      medicalLicenceDocResult,
      doctorRegistrationDocResult,
    ] = await Promise.all([
      uploadToCloudinary(
        doctorProfilePicture[0].buffer,
        "doctor/image",
        "image",
      ),
      uploadToCloudinary(medicalLicenceDoc[0].buffer, "doctor/docs", "raw"),
      uploadToCloudinary(doctorRegistrationDoc[0].buffer, "doctor/docs", "raw"),
    ]);

    let clinic =
      await this._clinicRepository.findByRegistrationNumber(registrationNumber);

    if (!clinic) {
      const [clinicRegistrationDocResult, establishmentLicenceDocResult] =
        await Promise.all([
          uploadToCloudinary(
            clinicRegistrationDoc[0].buffer,
            "doctor/docs",
            "raw",
          ),
          uploadToCloudinary(
            establishmentLicenceDoc[0].buffer,
            "doctor/docs",
            "raw",
          ),
        ]);

      const clinicDetailsToUpdate = {
        id: null,
        name: clinicName,
        registrationNumber,
        about: about ?? "",
        altPhone: altPhone ?? null,
        registrationDoc: clinicRegistrationDocResult,
        establishmentLicenceDoc: establishmentLicenceDocResult,
        location: {
          type: "Point" as const,
          coordinates: [longitude, latitude] as [number, number],
        },
        createdAt: null,
        updatedAt: null,
      };

      clinic = await this._clinicRepository.save(
        Clinic.register(clinicDetailsToUpdate),
      );

      const clinicAddressToUpdate = {
        id: null,
        ownerId: clinic.id,
        addressLine,
        ownerType: "Clinic" as ModeRoleRef,
        country,
        state,
        city,
        pincode,
      };

      await this._addressRepository.save(Address.create(clinicAddressToUpdate));
    }

    const doctorCode = process.env.DOCTOR_NUMBER_MODEL + "-" + code;

    const doctorDetailsToUpdate = {
      id: null,
      userId: user.id,
      displayName: fullName,
      doctorCode,
      bio,
      profilePicture: doctorProfilePictureResult,
      gender,
      departmentId,
      specialization,
      qualification,
      experienceYears,
      licenceNumber,
      registrationDoc: doctorRegistrationDocResult,
      medicalLicenceDoc: medicalLicenceDocResult,
    };

    const createDoctor = await this._doctorRepository.save(
      Doctor.register(doctorDetailsToUpdate),
    );

    const doctorClinicDetailsToUpdate = {
      id: null,
      doctorId: createDoctor.id,
      clinicId: clinic.id,
      type: mode,
      consultationFee,
    };

    const doctorAddressToUpdate = {
      id: null,
      ownerId: createDoctor.id,
      addressLine: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    };

    await Promise.all([
      this._doctorClinicRepository.save(
        DoctorClinic.register(doctorClinicDetailsToUpdate),
      ),
      this._addressRepository.save(
        Address.createForOwner(doctorAddressToUpdate, "Doctor"),
      ),
    ]);
  }
}
