import {
  APPROVED_MESSAGE,
  DOCTOR_REJECTED_MESSAGE,
  EMAIL_SUBJECTS,
} from "../../../../domain/constants/email.constants.ts";
import { DoctorReapplication } from "../../../../domain/entities/doctor-reapplication.entity.ts";
import { Doctor } from "../../../../domain/entities/doctor.entity.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import { ValidationError } from "../../../../domain/errors/validation.error.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorReapplicationRepository } from "../../../../domain/repositories/i-doctor-reapplication.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IMailService } from "../../../../domain/services/email.service.ts";
import { deleteFromCloudinary } from "../../../../infrastructure/cloudinary/cloudinary.uploader.ts";
import type { DoctorStatusUpdateDto } from "../../../dto/doctor.dto.ts";
import type { IActionTokenGenerationService } from "../../../i-service/i-action-token-generation.service.ts";
import type { IUpdateDoctorStatusUseCase } from "../../../repositories/admin/i-update-doctor-status.usecase.ts";

export class RejectDoctorUseCase implements IUpdateDoctorStatusUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _userRepository: IUserRepository,
    private _doctorClinicRepository: IDoctorClinicRepository,
    private _clinicRepository: IClinicRepository,
    private _addressRepository: IAddressRepository,
    private _doctorReapplication: IDoctorReapplicationRepository,
    private _emailService: IMailService,
    private _actionTokenService: IActionTokenGenerationService,
  ) {}

  async execute(data: DoctorStatusUpdateDto): Promise<void> {
    const { rejectedReason, rejectedMessage, fields, id } = data;
    const doctor = await this._doctorRepository.findById(data.id);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    if (!doctor.isPending()) {
      throw new ValidationError("Doctor has already been reviewed.");
    }

    const user = await this._userRepository.findById(doctor?.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Doctor");
    }

    const doctorClinic = await this._doctorClinicRepository.findOneBy({
      doctorId: doctor.id,
    });

    if (!doctorClinic || !doctorClinic.id || !doctorClinic.clinicId) {
      throw new NotFoundError("Doctor");
    }

    const clinic = await this._clinicRepository.findById(doctorClinic.clinicId);

    if (!clinic || !clinic.id) {
      throw new NotFoundError("Clinic");
    }

    if (clinic.establishmentLicenceDoc.status === "REJECTED") {
      fields.push("establishmentLicenceDoc");
    }

    if (clinic.registrationDoc.status === "REJECTED") {
      fields.push("clinicRegistrationDoc");
    }

    if (doctor.medicalLicenceDoc.status === "REJECTED") {
      fields.push("medicalLicenceDoc");
    }

    if (doctor.registrationDoc.status === "REJECTED") {
      fields.push("doctorRegistrationDoc");
    }

    doctor.reject(rejectedMessage, rejectedReason, fields);

    let expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const doctorReapplication = await this._doctorReapplication.save(
      DoctorReapplication.create({
        doctorId: doctor.id,
        tokenHash: "",
        tokenExpiresAt: expiresAt,
        status: "PENDING",
        fieldsToReupload: doctor.fieldsToReupload,
        reviewMessage: doctor.reviewedMessage,
        reviewedReason: doctor.reviewedReason,
        submittedAt: new Date(),
        reviewedAt: null,
        createdAt: null,
        updatedAt: null,
      }),
    );

    await this._doctorRepository.findByIdAndUpdate(doctor.id, {
      status: doctor.status,
      reviewedAt: doctor.reviewedAt,
      reviewedMessage: doctor.reviewedMessage,
    });

    const actionToken =
      await this._actionTokenService.generate(doctorReapplication);

    const subject = EMAIL_SUBJECTS.DOCTOR_REJECTED;
    const reapplicationLink = `${process.env.CLIENT_ORIGIN}/doctor/reapplication?token=${actionToken}`;

    const body = DOCTOR_REJECTED_MESSAGE(
      user.fullName,
      doctor.reviewedMessage!,
      reapplicationLink,
    );

    this._emailService.sendMail(user.email, subject, body);
    
  }
}
