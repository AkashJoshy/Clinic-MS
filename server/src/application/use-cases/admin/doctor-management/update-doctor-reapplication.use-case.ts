import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorReapplicationRepository } from "../../../../domain/repositories/i-doctor-reapplication.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { DoctorUpdateReapplicationDto } from "../../../dto/doctor.dto.ts";
import type { IGetDoctorDetailsContextService } from "../../../i-service/i-get-doctor-details-context.service.ts";
import type { IUpdateAddressService } from "../../../i-service/i-update-address.service.ts";
import type { IUpdateClinicService } from "../../../i-service/i-update-clinic.service.ts";
import type { IUpdateDoctorService } from "../../../i-service/i-update-doctor.service.ts";
import type { IVerifyDoctorReapplicationTokenService } from "../../../i-service/i-verify-doctor-reapplication.service.ts";
import type { IDoctorUpdateReapplicationUseCase } from "../../../repositories/doctor/i-doctor-update-reapplication.usecase.ts";

export class UpdateReapplicationDetailsUseCase implements IDoctorUpdateReapplicationUseCase {
  constructor(
    private readonly _doctorReapplicationRepository: IDoctorReapplicationRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _clinicRepository: IClinicRepository,
    private readonly _addressRepository: IAddressRepository,
    private readonly _verifyDoctorReapplicationService: IVerifyDoctorReapplicationTokenService,
    private readonly _getDoctorDetailsContextService: IGetDoctorDetailsContextService,
    private readonly _updateDoctorService: IUpdateDoctorService,
    private readonly _updateClinicService: IUpdateClinicService,
    private readonly _updateAddressService: IUpdateAddressService,
  ) {}

  async execute(doctorData: DoctorUpdateReapplicationDto): Promise<void> {
    const { data, files, token } = doctorData;

    console.log(doctorData);

    const { reapplication } =
      await this._verifyDoctorReapplicationService.execute(token);

    const {
      user,
      address: clinicAddress,
      clinic,
      doctor,
    } = await this._getDoctorDetailsContextService.execute(
      reapplication.doctorId!,
    );

    const {
      profilePicture,
      doctorRegistrationDoc,
      medicalLicenceDoc,
      clinicRegistrationDoc,
      establishmentLicenceDoc,
    } = files;

    const {
      bio,
      fullName,
      experienceYears,
      gender,
      licenceNumber,
      qualification,
      specialization,
      phone,
      about,
      altPhone,
      clinicName,
      registrationNumber,
      city,
      addressLine,
      pincode,
    } = data;

    const doctorDetailsToPass = {
      id: doctor.id!,
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

    const clinicDetailsToPass = {
      ...(about !== undefined && { about }),
      ...(altPhone !== undefined && { altPhone }),
      ...(clinicName !== undefined && { name: clinicName }),
      ...(registrationNumber !== undefined && { registrationNumber }),
      ...(clinicRegistrationDoc !== undefined && { clinicRegistrationDoc }),
      ...(establishmentLicenceDoc !== undefined && { establishmentLicenceDoc }),
    };

    const addressDetailsToPass = {
      ...(city !== undefined && { city }),
      ...(addressLine !== undefined && { addressLine }),
      ...(pincode !== undefined && { pincode }),
    };

    const { doctor: updatedDoctor, user: updatedUser } =
      await this._updateDoctorService.execute({
        doctor,
        user,
        updates: doctorDetailsToPass,
      });

    doctor.submit();

    const updatedClinic = await this._updateClinicService.execute({
      clinic,
      updates: clinicDetailsToPass,
    });

    const updatedAddress = await this._updateAddressService.execute({
      address: clinicAddress,
      updates: addressDetailsToPass,
    });

    await Promise.all([
      this._userRepository.findByIdAndUpdate(user.id!, {
        fullName: updatedUser.fullName,
        phone: updatedUser.phone,
      }),
      this._doctorRepository.findByIdAndUpdate(doctor.id!, {
        bio: updatedDoctor.bio,
        displayName: updatedDoctor.displayName,
        experienceYears: updatedDoctor.experienceYears,
        gender: updatedDoctor.gender,
        licenceNumber: updatedDoctor.licenceNumber,
        qualification: updatedDoctor.qualification,
        specialization: updatedDoctor.specialization,
        profilePicture: updatedDoctor.profilePicture,
        registrationDoc: updatedDoctor.registrationDoc,
        medicalLicenceDoc: updatedDoctor.medicalLicenceDoc,
        status: doctor.status,
      }),
      this._clinicRepository.findByIdAndUpdate(clinic.id!, {
        name: updatedClinic.name,
        about: updatedClinic.about,
        altPhone: updatedClinic.altPhone,
        registrationNumber: updatedClinic.registrationNumber,
        registrationDoc: updatedClinic.registrationDoc,
        establishmentLicenceDoc: updatedClinic.establishmentLicenceDoc,
      }),
      this._addressRepository.findByIdAndUpdate(clinicAddress.id!, {
        addressLine: updatedAddress.addressLine,
        city: updatedAddress.city,
        pincode: updatedAddress.pincode,
      }),
      this._doctorReapplicationRepository.findByIdAndUpdate(reapplication.id!, {
        reviewedAt: reapplication.reviewedAt,
        status: reapplication.status
      })
    ]).catch((error) => {
      throw new InternalServerError(error.message);
    });
  }


}
