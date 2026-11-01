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
import type { IAccessTokenGenerationService } from "../../../interfaces/services/shared/token/i-access-token-generation.service.ts";
import type { IEmailVerificationService } from "../../../interfaces/services/shared/user/i-email-verification.service.ts";
import type { IRefreshTokenGenerationService } from "../../../interfaces/services/shared/token/i-refresh-token-generation.service.ts";
import type { IDoctorLoginUseCase } from "../../../interfaces/repositories/auth/i-doctor-login.usecase.ts";
import type { IUserExistenceService } from "../../../interfaces/services/shared/user/i-user-existence.service.ts";

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

    console.log(`Reaching...1`);
    let status: RestrictionStatus | null = null;
    if (!user || !user.id) {
      throw new NotFoundError("doctor");
    }

    const doctor = await this._doctorRepository.findOneBy({ userId: user.id });
    console.log(`Doctor details: `);
    console.log(doctor);
    if (!doctor || !doctor.id) {
      throw new NotFoundError("doctor");
    }
    console.log(`Reaching...4`);

    if (doctor.status === "PENDING") {
      status = "PENDING";
      return status;
    } else if (doctor?.status === "REJECTED") {
      status = "REJECTED";
      return status;
    }

    console.log(`Reaching...4`);
    if (!user.isEmailVerified) {
      const token = await this._mailVerficationService.execute({
        email: user.email,
        name: user.fullName,
        role: user.role as Role,
      });

      return {
        token,
        email: user.email,
        role: user.role,
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
