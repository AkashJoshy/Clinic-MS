import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import type { ICacheService } from "../../../../domain/services/CacheService.js";
import type { IHashService } from "../../../../domain/services/hashService.ts";
import { AppError } from "../../../../domain/errors/app.errors.js";
import type { ResetPasswordDto } from "../../../dto/auth.dto.ts";
import type { IResetPasswordUseCase } from "../../../repositories/auth/IResetPasswordUseCase.ts";
import { TokenExpiredAppError } from "../../../../domain/errors/token-expired.error.ts";

export class ResetAdminPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _cacheService: ICacheService,
    private readonly _passwordService: IHashService,
  ) {}

  async execute(passwordData: ResetPasswordDto): Promise<void> {
    const { token, password, role } = passwordData;

    if (!token) {
      throw new TokenExpiredAppError();
    }

    const cachedData = await this._cacheService.get<{ email: string }>(
      `reset:${token}`,
    );

    if (!cachedData) {
      throw new AppError("Invalid or expired reset token");
    }

    const { email } = cachedData;
    const user = await this._userRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new AppError("User not found");
    }

    if (user.role != role) {
      throw new AppError("Access Denied");
    }

    if (!user.isActive) {
      throw new AppError("User is inactive or blocked");
    }

    const hashedPassword = await this._passwordService.hash(password, "Password");

    if (!hashedPassword) {
      throw new AppError("Failed to hash password");
    }

    await this._userRepository.findByIdAndUpdate(user.id!, {
      password: hashedPassword,
    });

    await this._cacheService.delete(`reset:${token}`);
  }
}
