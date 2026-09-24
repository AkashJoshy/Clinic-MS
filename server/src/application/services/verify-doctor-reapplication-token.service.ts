import { NotFoundError } from "../../domain/errors/not-found.error.ts";
import { TokenExpiredAppError } from "../../domain/errors/token-expired.error.ts";
import { AlreadyExistsError } from "../../domain/errors/user-already-exists.error.ts";
import type { IDoctorReapplicationRepository } from "../../domain/repositories/i-doctor-reapplication.repository.ts";
import type { IHashService } from "../../domain/services/hash.service.ts";
import type { ITokenService } from "../../domain/services/token.service.ts";
import type { ActionTokenPayloadDto } from "../dto/auth.dto.ts";
import type { DoctorReapplicationResponseDto } from "../dto/doctor.dto.ts";
import type { IVerifyDoctorReapplicationTokenService } from "../i-service/i-verify-doctor-reapplication.service.ts";

export class VerifyDoctorReapplicationTokenService implements IVerifyDoctorReapplicationTokenService {
  constructor(
    private readonly _doctorReapplicationRepository: IDoctorReapplicationRepository,
    private readonly _tokenService: ITokenService,
    private readonly _HashService: IHashService,
  ) {}

  async execute(token: string): Promise<DoctorReapplicationResponseDto> {
    const decoded = this._tokenService.verifyActionToken(
      token,
    ) as ActionTokenPayloadDto;

    if (!decoded) { 
      throw new TokenExpiredAppError();
    }

    const reapplication = await this._doctorReapplicationRepository.findById(
      decoded.id,
    );

    if (!reapplication) {
      throw new NotFoundError("Re-application");
    }

    const isTokenMatched = await this._HashService.compare(
      decoded.tokenId,
      reapplication.tokenHash,
      "Token",
    );

    if (!isTokenMatched) {
      throw new Error("Invalid re-application token");
    }

    if (reapplication.isTokenExpired()) {
      throw new Error("Re-application link has expired");
    }

    if (!reapplication.isPending()) {
      throw new AlreadyExistsError("Reapplication is no longer available");
    }

    if (reapplication.isSubmitted()) {
      throw new AlreadyExistsError("Reapplication is already approved")
    }

    if (!reapplication.doctorId) {
      throw new NotFoundError("Doctor");
    }

    reapplication.submit()

    return {
      reapplication
    }

  }
}
