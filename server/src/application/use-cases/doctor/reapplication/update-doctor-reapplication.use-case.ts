import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorReapplicationRepository } from "../../../../domain/repositories/i-doctor-reapplication.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { ReapplicationUpdateDto } from "../../../dto/doctor.dto.ts";
import type { IDoctorUpdateReapplicationUseCase } from "../../../interfaces/repositories/doctor/reapplication/i-doctor-update-reapplication.usecase.ts";
import type { IGetDoctorDetailsContextService } from "../../../interfaces/services/doctor/i-get-doctor-details-context.service.ts";
import type { IUpdateAddressService } from "../../../interfaces/services/shared/address/i-update-address.service.ts";
import type { IUpdateClinicService } from "../../../interfaces/services/clinic/i-update-clinic.service.ts";
import type { IUpdateDoctorService } from "../../../interfaces/services/doctor/i-update-doctor.service.ts";
import type { IVerifyDoctorReapplicationTokenService } from "../../../interfaces/services/doctor/i-verify-doctor-reapplication.service.ts";
import { DoctorReapplicationMapper } from "../../../mappers/admin/doctor-re-application.mapper.ts";

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

  async execute(doctorData: ReapplicationUpdateDto): Promise<void> {
    const { data, files, token } = doctorData;

    const { reapplication } =
      await this._verifyDoctorReapplicationService.execute(token);

    if (!reapplication.doctorId) {
      throw new NotFoundError("Doctor");
    }

    if (reapplication.status === "APPROVED") {
      throw new AlreadyExistsError(
        "Your doctor reapplication has already been approved.",
      );
    }

    if (reapplication.status === "EXPIRED") {
      throw new NotFoundError("Your doctor reapplication has expired.");
    }

    if (reapplication.status === "REJECTED") {
      throw new NotFoundError("Your doctor reapplication has been rejected.");
    }

    if (reapplication.status === "SUBMITTED") {
      throw new AlreadyExistsError(
        "You have already submitted a doctor reapplication.",
      );
    }

    const {
      user,
      address: clinicAddress,
      clinic,
      doctor,
    } = await this._getDoctorDetailsContextService.execute(
      reapplication.doctorId,
    );

    const reapplicationData = {
      data,
      files,
    };

    const doctorDetailsToPass = DoctorReapplicationMapper.toDoctorUpdates(
      reapplication.doctorId,
      reapplicationData,
    );

    const clinicDetailsToPass =
      DoctorReapplicationMapper.toClinicUpdates(reapplicationData);

    const addressDetailsToPass = DoctorReapplicationMapper.toAddressUpdates({
      data,
    });

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
      this._doctorRepository.findByIdAndUpdate(
        doctor.id!,
        DoctorReapplicationMapper.toDoctorPersistenceUpdates(updatedDoctor),
      ),
      this._clinicRepository.findByIdAndUpdate(
        clinic.id!,
        DoctorReapplicationMapper.toClinicPersistenceUpdates(updatedClinic),
      ),
      this._addressRepository.findByIdAndUpdate(clinicAddress.id!, {
        addressLine: updatedAddress.addressLine,
        city: updatedAddress.city,
        pincode: updatedAddress.pincode,
      }),
      this._doctorReapplicationRepository.findByIdAndUpdate(reapplication.id!, {
        reviewedAt: reapplication.reviewedAt,
        status: reapplication.status,
      }),
    ]).catch((error) => {
      throw new InternalServerError(error.message);
    });
  }
}
