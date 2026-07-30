import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type {
  GoogleLoginDTO,
  LoginResponseDTO,
} from "../../../dto/auth.dto.ts";
import type { IPatientGoogleAuthUseCase } from "../../../repositories/auth/IPatientGoogleAuthUsecase.ts";
import type { ITokenGenerationService } from "../../../IService/ITokenGenerationService.ts";

export class PatientGoogleLoginUseCase implements IPatientGoogleAuthUseCase {
  constructor(
    private _tokenGenerationService: ITokenGenerationService,
    private _userRepository: IUserRepository,
  ) {}

  async execute(user: GoogleLoginDTO): Promise<LoginResponseDTO> {
    const isUserExisted = await this._userRepository.findByEmail(user.email);

    if (!isUserExisted) {
      return {
        user: null,
        accessToken: "",
        role: "patient",
        message: "Account not found. Redirecting to signup...",
      };
    }

    const accessToken =
      await this._tokenGenerationService.generate(isUserExisted);

    if (!accessToken) {
      return {
        user: null,
        accessToken: "",
        role: "patient",
        message: "Token expired!, Login again",
      };
    }

    const { password, ...updatedUser } = isUserExisted;

    return {
      user: updatedUser,
      accessToken,
      role: "patient",
    };
  }
}