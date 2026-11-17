import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IDoctorSettingsRepository } from "../../../../domain/repositories/i-doctor-settings.repository.ts";
import type { IGetDoctorSettingsUseCase } from "../../../interfaces/repositories/doctor/settings/i-get-doctor-settings.use-case.ts";
import type { GetDoctorSettingsResponseDto } from "../../../dto/doctor-settings.dto.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";

export class GetDoctorSettingsUseCase implements IGetDoctorSettingsUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _doctorSettingsRepository: IDoctorSettingsRepository,
  ) {}

  async execute(userId: string): Promise<GetDoctorSettingsResponseDto> {
    const doctor = await this._doctorRepository.findOneBy({ userId });
    const user = await this._userRepository.findById(userId);

    if (!user || !user.id) {
      throw new NotFoundError("Doctor");
    }

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    const doctorSettings = await this._doctorSettingsRepository.findByDoctorId(
      doctor.id,
    );

    if (!doctorSettings || !doctorSettings.id) {
      throw new NotFoundError("Doctor settings");
    }

    const { createdAt, ...updatedDoctorSettings } = doctorSettings;

    return {
      ...updatedDoctorSettings,
      displayName: doctor.displayName,
      phone: user?.phone,
    };
  }
}
