import { ForbiddenError } from "../../../../domain/errors/forbidden.error.ts";
import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials.error.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IHashService } from "../../../../domain/services/i-hash.service.ts";
import type {
  LoginDTO,
  UserResponseDto,
} from "../../../dto/auth.dto.ts";
import type { IUserExistenceService } from "../../../interfaces/services/shared/user/i-user-existence.service.ts";

export class UserExistenceService implements IUserExistenceService {
  constructor(
    private _userRepository: IUserRepository,
    private _hashService: IHashService,
  ) {}

  async execute(data: LoginDTO): Promise<UserResponseDto> {
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

    if (existingUser.isBlocked) {
      throw new ForbiddenError("Account access is currently restricted");
    }

    return existingUser;
  }
}
