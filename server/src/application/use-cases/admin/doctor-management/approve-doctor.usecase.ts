import {
  APPROVED_MESSAGE,
  EMAIL_SUBJECTS,
} from "../../../../domain/constants/email.constants.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/IDoctorRepository.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type { IMailService } from "../../../../domain/services/EmailService.ts";
import type { DoctorStatusUpdateDto } from "../../../dto/doctor.dto.ts";
import type { IUpdateDoctorStatusUseCase } from "../../../repositories/admin/IUpdateDoctorStatusUseCase.ts";

export class ApproveDoctorUseCase implements IUpdateDoctorStatusUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
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

    doctor.approve(data.reviewMessage);

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
