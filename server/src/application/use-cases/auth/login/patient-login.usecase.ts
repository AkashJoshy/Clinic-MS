import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials.error.ts";
import type { Role } from "../../../../domain/types/user.types.ts";
import type { LoginDTO, LoginResponseDTO } from "../../../dto/auth.dto.ts";
import type { IEmailVerificationService } from "../../../IService/IEmailVerificationService.ts";
import type { ITokenGenerationService } from "../../../IService/ITokenGenerationService.ts";
import type { IUserExistenceService } from "../../../IService/IUserExistenceService.ts";
import type { ILoginUseCase } from "../../../repositories/auth/ILoginUseCase.ts";

export class PatientLoginUseCase implements ILoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private _tokenGenerationService: ITokenGenerationService,
    private readonly _mailVerficationService: IEmailVerificationService,
  ) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this._userExistenceService.execute(data);

    if (!user.isEmailVerified) {
      await this._mailVerficationService.execute(user.email, user.fullName, user.role as Role);
      throw new InvalidCredentialsError(
        "A verification email has been sent. Please check your inbox and verify your account.",
      );
    }

    const { password, ...updatedUser } = user

    const accessToken = await this._tokenGenerationService.generate(user);

    let role = user.role.toLowerCase()

    return {
      user: updatedUser,
      accessToken,
      role
    };
  }
}