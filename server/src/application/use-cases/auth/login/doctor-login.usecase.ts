import { ForbiddenError } from "../../../../domain/errors/forbidden.error.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { RestrictionStatus } from "../../../../domain/types/shared.types.ts";
import type { Role } from "../../../../domain/types/user.types.ts";
import type {
  AccessPayloadDto,
  LoginDTO,
  LoginResponseDTO,
  LoginVerificationResponseDTO,
  RefreshPayloadDto,
} from "../../../dto/auth.dto.ts";
import type { IAccessTokenGenerationService } from "../../../IService/i-access-token-generation.service.ts";
import type { IEmailVerificationService } from "../../../IService/i-email-verification.service.ts";
import type { IRefreshTokenGenerationService } from "../../../IService/i-refresh-token-generation.service.ts";
import type { IUserExistenceService } from "../../../IService/i-user-existence.service.ts";
import type { IDoctorLoginUseCase } from "../../../repositories/auth/i-doctor-login.usecase.ts";

export class DoctorLoginUseCase implements IDoctorLoginUseCase {
  constructor(
    private _userExistenceService: IUserExistenceService,
    private readonly _mailVerficationService: IEmailVerificationService,
    private _doctorRepository: IDoctorRepository,
    private _accesstokenGenerationService: IAccessTokenGenerationService,
    private _refreshtokenGenerationService: IRefreshTokenGenerationService,
  ) {}

  async execute(
    data: LoginDTO,
  ): Promise<
    LoginResponseDTO | LoginVerificationResponseDTO | RestrictionStatus
  > {
    const user = await this._userExistenceService.execute(data);

    let status: RestrictionStatus | null = null;
    if (!user || !user.id) {
      throw new NotFoundError("doctor");
    }

    const doctor = await this._doctorRepository.findOneBy({ userId: user.id });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("doctor");
    }

    if (doctor.status === "PENDING") {
      status = "PENDING";
      return status;
    } else if (doctor?.status === "REJECTED") {
      status = "REJECTED";
      return status;
    }

    if (!user.isEmailVerified) {
      const token = await this._mailVerficationService.execute(
        user.email,
        user.fullName,
        user.role as Role,
      )

      return {
        token,
        email: user.email,
        role: user.role
      };
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
