import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials.error.ts";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.ts";
import type { IHashService } from "../../domain/services/PasswordService.ts";
import type { LoginDTO, UserDto } from "../dto/auth.dto.ts";

export class UserExistenceService {
  constructor(private _userRepository: IUserRepository, private _hashService: IHashService) {}

  async execute(data: LoginDTO): Promise<UserDto> {
    const existingUser = await this._userRepository.findByEmail(data.email);

    if (!existingUser || !existingUser.password) {
      throw new InvalidCredentialsError();
    }

    const isPasswordMatched = await this._hashService.comparePassword(
      data.password,
      existingUser.password,
    );

    if (!isPasswordMatched) {
      throw new InvalidCredentialsError("Invalid Credentials");
    }

    if (data.role !== existingUser.role) {
      throw new InvalidCredentialsError("Access denied");
    }
      
    return existingUser
  }
}
