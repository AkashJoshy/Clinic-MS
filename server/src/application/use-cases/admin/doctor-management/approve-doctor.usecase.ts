import {
  APPROVED_MESSAGE,
  EMAIL_SUBJECTS,
} from "../../../../domain/constants/email.constants.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IMailService } from "../../../../domain/services/i-email.service.ts";
import type { ReviewDoctorUpdateDto } from "../../../dto/doctor.dto.ts";
import type { IReviewDoctorUseCase } from "../../../interfaces/repositories/admin/doctor/i-review-doctor.usecase.ts";

export class ApproveDoctorUseCase implements IReviewDoctorUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _clinicRepository: IClinicRepository,
    private _doctorClinicRepository: IDoctorClinicRepository,
    private _userRepository: IUserRepository,
    private _emailService: IMailService,
  ) {}
  async execute(data: ReviewDoctorUpdateDto): Promise<void> {
    const { id, fields, rejectedMessage, rejectedReason } = data
    const doctor = await this._doctorRepository.findById(id);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
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

    if (!clinic.isApproved()) {
      clinic.approve();
      await this._clinicRepository.findByIdAndUpdate(clinic.id, {
        status: clinic.status,
      });
    }

    doctorClinic.activate();

    doctor.approve(rejectedMessage);

    await this._doctorRepository.findByIdAndUpdate(doctor.id, {
      status: doctor.status,
      reviewedAt: doctor.reviewedAt,
      reviewedMessage: doctor.reviewedMessage,
    });

    const subject = EMAIL_SUBJECTS.DOCTOR_APPROVED;
    const body = APPROVED_MESSAGE(user.fullName, "Doctor");

    this._emailService.sendMail(user.email, subject, body);
  }
}
