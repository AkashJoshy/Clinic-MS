import User from "../../domain/entities/User.js";
import { InternalServerError } from "../../domain/errors/internal-server.error.js";
import { AlreadyExistsError } from "../../domain/errors/user-already-exists.error.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { IHashService } from "../../domain/services/PasswordService.js";
import type { RegisterUserDTO, UserDto } from "../dto/auth.dto.js";

export class UserCreationService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly _hasher: IHashService,
  ) {}

  async execute(dto: RegisterUserDTO, message?: string): Promise<UserDto> {
    const exists = await this.userRepo.findByEmail(dto.email);
    if (exists) throw new AlreadyExistsError(message);

    const hashed = await this._hasher.hashPassword(dto.password);
    if (!hashed) {
        throw new InternalServerError()
    }
    return this.userRepo.save(User.create({
      ...dto,
      password: hashed,
      isEmailVerified: false,
      isBlocked: false,
      isActive: false,
      isTwoFactorenabled: false,
      provider: "LOCAL"
    }));
  }
}