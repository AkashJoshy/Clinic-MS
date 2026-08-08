import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/IDoctorRepository.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type { UserStatusDto } from "../../../dto/admin.dto.ts";
import type { DeletePatientDto } from "../../../dto/patient.dto.ts";
import type { IUpdateStatusUseCase } from "../../../repositories/admin/IUpdateStatusUseCase.ts";

export class UpdateDoctorStatusUseCase implements IUpdateStatusUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _userRepository: IUserRepository,
  ) {}

  async execute(data: DeletePatientDto): Promise<UserStatusDto> {
    const doctor = await this._doctorRepository.findById(data.id);

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("doctor");
    }

    const user = await this._userRepository.findById(doctor.userId);

    if (!user || !user.id) {
      throw new NotFoundError("Doctor");
    }

    let message = "";
    if (data.method === "DELETE") {
      user.block();
      message = "Doctor has been blocked successfully.";
    } else if (data.method === "RESTORE") {
      user.unblock();
      message = "Doctor has been restored successfully.";
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
