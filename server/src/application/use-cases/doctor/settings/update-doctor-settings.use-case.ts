import { BadRequestError } from "../../../../domain/errors/bad-request.error.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorSettingsRepository } from "../../../../domain/repositories/i-doctor-settings.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { UpdateDoctorSettingsDto, UpdateDoctorSettingsResponseDto } from "../../../dto/doctor-settings.dto.ts";
import type { IUpdateDoctorSettingsUseCase } from "../../../interfaces/repositories/doctor/settings/i-update-doctor-settings.use-case.ts";

export class UpdateDoctorSettingsUseCase implements IUpdateDoctorSettingsUseCase {
  constructor(
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _doctorSettingsRepository: IDoctorSettingsRepository,
  ) {}

  async execute(userId: string, data: UpdateDoctorSettingsDto): Promise<UpdateDoctorSettingsResponseDto> {
    const doctor = await this._doctorRepository.findOneBy({ userId });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    console.log(`Data in the Update Doctor Settings`)
    console.log(data)

    const doctorSettings = await this._doctorSettingsRepository.findByDoctorId(
      doctor.id,
    );

    if (!doctorSettings || !doctorSettings.id) {
      throw new NotFoundError("Doctor settings");
    }

    let fieldToUpdate: "profile" | "security" | "notifications" | "appearance";
    switch (data.section) {
      case "PROFILE":
        doctorSettings.updateProfile(data.data);
        fieldToUpdate = "profile";
        break;

      case "SECURITY":
        doctorSettings.updateSecurity(data.data);
        fieldToUpdate = "security";
        break;

      case "NOTIFICATIONS":
        doctorSettings.updateNotifications(data.data);
        fieldToUpdate = "notifications";
        break;

      case "APPEARANCE":
        doctorSettings.updateAppearance(data.data);
        fieldToUpdate = "appearance";
        break;

      default:
        throw new BadRequestError("Invalid doctor settings section");
    }

    const updatedDoctorSettings = await this._doctorSettingsRepository.findByIdAndUpdate(doctorSettings.id, {
      [fieldToUpdate]: doctorSettings[fieldToUpdate],
    });

    if (!updatedDoctorSettings) {
        throw new InternalServerError("Failed to update doctor settings. Please try again later.")
    }

    return updatedDoctorSettings[fieldToUpdate]
  }
}
