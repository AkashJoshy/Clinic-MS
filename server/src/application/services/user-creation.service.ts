import User from "../../domain/entities/User.js";
import { InternalServerError } from "../../domain/errors/internal-server.error.js";
import { AlreadyExistsError } from "../../domain/errors/user-already-exists.error.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { IHashService } from "../../domain/services/hashService.ts";
import type { RegisterUserDTO, UserDto } from "../dto/auth.dto.js";

export class UserCreationService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _hashService: IHashService,
  ) {}

  async execute(dto: RegisterUserDTO, message?: string): Promise<UserDto> {
    const exists = await this._userRepository.findByEmail(dto.email);
    if (exists) throw new AlreadyExistsError(message);

    const hashed = await this._hashService.hash(dto.password, "Password");
    if (!hashed) {
      throw new InternalServerError();
    }
    return this._userRepository.save(
      User.create({
        ...dto,
        password: hashed,
        isEmailVerified: false,
        isBlocked: false,
        isActive: false,
        isTwoFactorenabled: false,
        provider: "LOCAL",
      }),
    );
  }
}
