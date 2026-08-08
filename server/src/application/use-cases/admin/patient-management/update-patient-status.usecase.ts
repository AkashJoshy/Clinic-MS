import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IPatientRepository } from "../../../../domain/repositories/IPatientRepository.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type { UserStatusDto } from "../../../dto/admin.dto.ts";
import type { DeletePatientDto } from "../../../dto/patient.dto.ts";
import type { IUpdateStatusUseCase } from "../../../repositories/admin/IUpdateStatusUseCase.ts";

export class UpdatePatientStatusUseCase implements IUpdateStatusUseCase {
  constructor(
    private _patientRepository: IPatientRepository,
    private _userRepository: IUserRepository,
  ) {}

  async execute(data: DeletePatientDto): Promise<UserStatusDto> {
    const patient = await this._patientRepository.findById(data.id);

    if (!patient || !patient.id || !patient.userId) {
      throw new NotFoundError("Patient");
    }

    const user = await this._userRepository.findById(patient.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Patient");
    }

    let message = "";
    if (data.method === "BLOCK") {
      user.block();
      message = "Patient has been blocked successfully.";
    } else if (data.method === "RESTORE") {
      user.unblock();
      message = "Patient has been restored successfully.";
    } else {
      throw new Error("Invalid Operation");
    }

    await this._userRepository.findByIdAndUpdate(user.id, {
      isBlocked: user.isBlocked,
      isActive: user.isActive,
    });

    return {
      userId: user.id,
      isActive: user.isActive,
      isBlocked: user.isBlocked,
      message
    }
  }
}
