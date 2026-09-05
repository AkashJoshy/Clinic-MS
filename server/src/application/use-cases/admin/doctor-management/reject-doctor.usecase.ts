import {
  APPROVED_MESSAGE,
  EMAIL_SUBJECTS,
  REJECTED_MESSAGE,
} from "../../../../domain/constants/email.constants.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { ValidationError } from "../../../../domain/errors/validation.error.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IMailService } from "../../../../domain/services/email.service.ts";
import { deleteFromCloudinary } from "../../../../infrastructure/cloudinary/cloudinary.uploader.ts";
import type { DoctorStatusUpdateDto } from "../../../dto/doctor.dto.ts";
import type { IUpdateDoctorStatusUseCase } from "../../../repositories/admin/i-update-doctor-status.usecase.ts";

export class RejectDoctorUseCase implements IUpdateDoctorStatusUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _userRepository: IUserRepository,
    private _doctorClinicRepository: IDoctorClinicRepository,
    private _addressRepository: IAddressRepository,
    private _emailService: IMailService,
  ) {}

  async execute(data: DoctorStatusUpdateDto): Promise<void> {
    const doctor = await this._doctorRepository.findById(data.id);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }
    if (doctor.status !== "PENDING") {
      throw new ValidationError("Doctor has already been reviewed.");
    }

    const user = await this._userRepository.findById(doctor?.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Doctor");
    }

    const doctorClinic = await this._doctorClinicRepository.findOneBy({
      doctorId: doctor.id,
    });
    if (!doctorClinic || !doctorClinic.id) {
      throw new NotFoundError("Doctor");
    }

    doctor.reject(data.reviewMessage);

    await this._doctorRepository.findByIdAndUpdate(doctor.id, {
      status: doctor.status,
      reviewedAt: doctor.reviewedAt,
      reviewedMessage: doctor.reviewedMessage,
    });

    await Promise.all([
      this._addressRepository.deleteByUserId(user.id),
      this._doctorClinicRepository.delete(doctorClinic.id),
      this._doctorRepository.delete(doctor.id),
      this._userRepository.delete(user.id),
    ]).catch((error) => {
      throw new InternalServerError(error.message ?? "Internal server error");
    });

    await Promise.all([
      deleteFromCloudinary(doctor.registrationDoc.publicId, "raw"),
      deleteFromCloudinary(doctor.medicalLicenceDoc.publicId, "raw"),
      deleteFromCloudinary(doctor.profilePicture.publicId, "raw"),
    ]).catch((error) => {
      throw new InternalServerError(error.message ?? "Internal server error");
    });

    const subject = EMAIL_SUBJECTS.DOCTOR_REJECTED;
    const body = REJECTED_MESSAGE(user.fullName, "Doctor", data.reviewMessage);

    this._emailService.sendMail(user.email, subject, body);
  }
}
