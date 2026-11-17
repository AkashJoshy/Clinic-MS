import { BadRequestError } from "../../../../domain/errors/bad-request.error.ts";
import { InternalServerError } from "../../../../domain/errors/internal-server.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IHashService } from "../../../../domain/services/i-hash.service.ts";
import type { ChangePasswordDto } from "../../../dto/auth.dto.ts";
import type { IChangePasswordUseCase } from "../../../interfaces/repositories/auth/i-change-password.usecase.ts";

export class ChangeDoctorPasswordUseCase implements IChangePasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
    private readonly _passwordHasher: IHashService,
  ) {}

  async execute(data: ChangePasswordDto): Promise<void> {
    const { userId, currentPassword, newPassword } = data;

    const user = await this._userRepository.findById(userId);

    if (!user || !user.id) {
      throw new NotFoundError("User");
    }

    const doctor = await this._doctorRepository.findOneBy({ userId });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    const isCurrentPasswordValid = await this._passwordHasher.compare(
      currentPassword,
      user.password,
      "password",
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestError("Current password is incorrect");
    }

    const isSamePassword = await this._passwordHasher.compare(
      newPassword,
      user.password,
      "password",
    );

    if (isSamePassword) {
      throw new BadRequestError(
        "New password must be different from your current password",
      );
    }

    const hashedPassword = await this._passwordHasher.hash(
      newPassword,
      "password",
    );

    if (!hashedPassword) {
      throw new InternalServerError(
        "Unable to update password. Please try again later",
      );
    }

    await this._userRepository.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });
  }
}
