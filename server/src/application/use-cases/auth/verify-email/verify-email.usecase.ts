import { InternalServerError } from "../../../../domain/errors/internal-server.error.js";
import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials.error.js";
import { AlreadyExistsError } from "../../../../domain/errors/user-already-exists.error.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import type { ICacheService } from "../../../../domain/services/CacheService.js";
import type { CacheDTO, VerifyOtpDTO } from "../../../dto/auth.dto.ts";
import type { IVerifyEmailUseCase } from "../../../repositories/auth/IVerifyEmailUseCase.ts";

export class VerifyEmailUseCase implements IVerifyEmailUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _cacheService: ICacheService,
  ) {}

  async execute(data: VerifyOtpDTO): Promise<boolean> {
    const storedDetails = await this._cacheService.get<CacheDTO>(
      `verify:${data.token}`,
    );

    if (!data.token) {
      throw new InvalidCredentialsError("Token is missing");
    }

    if (data.otp.length < 6) {
      throw new InvalidCredentialsError("Invalid OTP");
    }

    if (!storedDetails?.otp) {
      throw new InvalidCredentialsError("OTP expired");
    }

    let user = await this._userRepository.findByEmail(storedDetails.email);

    if (!user) {
      throw new InvalidCredentialsError("User doesnt exists");
    }

    if (user.isEmailVerified) {
      throw new AlreadyExistsError("User already Verified");
    }

    if (storedDetails.otp !== data.otp) {
      throw new InvalidCredentialsError("Incorrect OTP");
    }

    if (!user.id) {
      throw new InternalServerError("Internal Error happened");
    }

    Promise.all([
      this._userRepository.findByIdAndUpdate(user.id, {
        isEmailVerified: true,
        isActive: true,
      }),
      this._cacheService.delete(`verify:${data.token}`),
    ]).catch((error) => {
      throw new InternalServerError(error.message);
    });

    return true;
  }
}