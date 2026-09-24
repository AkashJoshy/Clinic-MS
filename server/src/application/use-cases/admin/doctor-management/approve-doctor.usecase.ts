import {
  APPROVED_MESSAGE,
  EMAIL_SUBJECTS,
} from "../../../../domain/constants/email.constants.ts";
import { Clinic } from "../../../../domain/entities/clinic.entity.ts";
import { DoctorClinic } from "../../../../domain/entities/doctor-clinic.entity.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IMailService } from "../../../../domain/services/email.service.ts";
import type { DoctorStatusUpdateDto } from "../../../dto/doctor.dto.ts";
import type { IUpdateDoctorStatusUseCase } from "../../../repositories/admin/i-update-doctor-status.usecase.ts";

export class ApproveDoctorUseCase implements IUpdateDoctorStatusUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _clinicRepository: IClinicRepository,
    private _doctorClinicRepository: IDoctorClinicRepository,
    private _userRepository: IUserRepository,
    private _emailService: IMailService,
  ) {}

  async execute(data: DoctorStatusUpdateDto): Promise<void> {
    const doctor = await this._doctorRepository.findById(data.id);

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

    doctor.approve(data.rejectedMessage);

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
