import {
  APPROVED_MESSAGE,
  EMAIL_SUBJECTS,
} from "../../../../domain/constants/email.constants.ts";
import User from "../../../../domain/entities/User.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IPatientRepository } from "../../../../domain/repositories/IPatientRepository.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type { IMailService } from "../../../../domain/services/EmailService.ts";
import type { DeletePatientDto } from "../../../dto/patient.dto.ts";
import type { IUpdatePatientStatusUseCase } from "../../../repositories/admin/IUpdatePatientStatusUseCase.ts";

export class UpdatePatientStatusUseCase implements IUpdatePatientStatusUseCase {
  constructor(
    private _patientRepository: IPatientRepository,
    private _userRepository: IUserRepository,
  ) {}

  async execute(data: DeletePatientDto): Promise<void> {
    const patient = await this._patientRepository.findById(data.id);

    if (!patient || !patient.id || !patient.userId) {
      throw new NotFoundError("Patient");
    }

    const user = await this._userRepository.findById(patient.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Patient");
    }

    if (data.method === "DELETE") {
      user.block();
    } else if (data.method === "RESTORE") {
      user.unblock();
    } else {
      throw new Error("Invalid Operation");
    }

    await this._userRepository.findByIdAndUpdate(user.id, {
      isBlocked: user.isBlocked,
      isActive: user.isActive,
    });
  }
}
