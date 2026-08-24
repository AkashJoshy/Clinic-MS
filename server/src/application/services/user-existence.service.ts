import { ForbiddenError } from "../../domain/errors/forbidden.error.ts";
import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials.error.ts";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.ts";
import type { IHashService } from "../../domain/services/hashService.ts";
import type { LoginDTO, UserDto } from "../dto/auth.dto.ts";

export class UserExistenceService {
  constructor(
    private _userRepository: IUserRepository,
    private _hashService: IHashService,
  ) {}

  async execute(data: LoginDTO): Promise<UserDto> {
    const existingUser = await this._userRepository.findByEmail(data.email);

    if (!existingUser || !existingUser.password) {
      throw new InvalidCredentialsError();
    }

    const isPasswordMatched = await this._hashService.compare(
      data.password,
      existingUser.password,
      "Password",
    );

    if (!isPasswordMatched) {
      throw new InvalidCredentialsError("Invalid Credentials");
    }

    if (data.role !== existingUser.role) {
      throw new InvalidCredentialsError("Access denied");
    }

    if (existingUser.isBlocked || !existingUser.isActive) {
      throw new ForbiddenError("Account access is currently restricted");
    }

    return existingUser;
  }
}
