import { BadRequestError } from "../../../../domain/errors/bad-request.error.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorSettingsRepository } from "../../../../domain/repositories/i-doctor-settings.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type {
  DoctorPersonalResponseDto,
  UpdateDoctorPersonalDto,
} from "../../../dto/doctor.dto.ts";
import type { IUpdateDoctorPersonalUseCase } from "../../../interfaces/repositories/doctor/profile/i-update-doctor-personal.usecase.ts";

export class UpdateDoctorPersonalUseCase implements IUpdateDoctorPersonalUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _doctorSettingsRepository: IDoctorSettingsRepository,
  ) {}

  async execute(
    userId: string,
    data: UpdateDoctorPersonalDto,
  ): Promise<DoctorPersonalResponseDto> {
    const {
      acceptNewPatients,
      displayName,
      emergencyContactPhone,
      publicProfileVisible,
    } = data;
    const doctor = await this._doctorRepository.findOneBy({ userId });

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const doctorSettings = await this._doctorSettingsRepository.findByDoctorId(
      doctor.id,
    );

    if (!doctorSettings || !doctorSettings.id) {
      throw new NotFoundError("Doctor settings");
    }

    doctorSettings.updateProfile({
      acceptNewPatients,
      publicDirectoryVisibility: publicProfileVisible,
    });


    const [updatedDoctor, updatedDoctorSettings, updatedUser] =
      await Promise.all([
        this._doctorRepository.findByIdAndUpdate(doctor.id, {
          displayName,
        }),
        this._doctorSettingsRepository.findByIdAndUpdate(doctorSettings.id, {
          profile: { ...doctorSettings.profile },
        }),
        this._userRepository.findByIdAndUpdate(userId, {
          phone: emergencyContactPhone,
        }),
      ]).catch((error) => {
        throw new DatabaseError(error?.message);
      });

    if (!updatedDoctor || !updatedDoctorSettings || !updatedUser) {
      throw new BadRequestError("Error While");
    }

    return {
      acceptNewPatients: updatedDoctorSettings.profile.acceptNewPatients,
      publicProfileVisible:
        updatedDoctorSettings.profile.publicDirectoryVisibility,
      displayName: updatedDoctor.displayName,
      emergencyContactPhone: updatedUser.phone,
    };
  }
}
