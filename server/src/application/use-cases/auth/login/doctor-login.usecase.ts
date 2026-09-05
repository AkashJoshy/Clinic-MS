import { ForbiddenError } from "../../../../domain/errors/forbidden.error.ts";
import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials.error.ts";
import { LockedError } from "../../../../domain/errors/locked.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { Role } from "../../../../domain/types/user.types.ts";
import type {
  AccessPayloadDto,
  LoginDTO,
  LoginResponseDTO,
  RefreshPayloadDto,
} from "../../../dto/auth.dto.ts";
import type { IAccessTokenGenerationService } from "../../../IService/i-access-token-generation.service.ts";
import type { IEmailVerificationService } from "../../../IService/i-email-verification.service.ts";
import type { IRefreshTokenGenerationService } from "../../../IService/i-refresh-token-generation.service.ts";
import type { IUserExistenceService } from "../../../IService/i-user-existence.service.ts";
import type { ILoginUseCase } from "../../../repositories/auth/i-login.usecase.ts";

export class DoctorLoginUseCase implements ILoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private readonly _mailVerficationService: IEmailVerificationService,
    private _doctorRepository: IDoctorRepository,
    private _accesstokenGenerationService: IAccessTokenGenerationService,
    private _refreshtokenGenerationService: IRefreshTokenGenerationService,
  ) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this._userExistenceService.execute(data);

    if (!user || !user.id) {
      throw new NotFoundError("doctor");
    }

    const doctor = await this._doctorRepository.findOneBy({ userId: user.id });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("doctor");
    }

    if (doctor.status === "PENDING") {
      throw new LockedError(
        "Your doctor is under review. An admin needs to approve it.",
      );
    } else if (doctor?.status === "REJECTED") {
      throw new ForbiddenError(
        "Your clinic has been rejected. Please apply again.",
      );
    }

    if (!user.isEmailVerified) {
      await this._mailVerficationService.execute(
        user.email,
        user.fullName,
        user.role as Role,
      );
      throw new InvalidCredentialsError(
        "A verification email has been sent. Please check your inbox and verify your account.",
      );
    }

    const { password, ...updatedUser } = user;

    const accessPayload: AccessPayloadDto = {
      id: updatedUser.id!,
      role: updatedUser.role,
    };

    const refreshPayload: RefreshPayloadDto = {
      id: updatedUser.id!,
      tokenId: "",
    };

    const accessToken =
      await this._accesstokenGenerationService.generate(accessPayload);

    const refreshToken =
      await this._refreshtokenGenerationService.generate(refreshPayload);

    const tokenPair = {
      access: accessToken!,
      refresh: refreshToken!,
    };

    let role = user.role.toLowerCase();

    return {
      user,
      tokenPair,
      role,
    };
  }
}
