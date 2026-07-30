import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type { ICacheService } from "../../../../domain/services/CacheService.ts";
import type { IMailService } from "../../../../domain/services/EmailService.ts";
import { generateVerificationToken } from "../../../../shared/utils/token.helper.ts";
import {
  EMAIL_BODY,
  EMAIL_SUBJECTS,
} from "../../../../domain/constants/email.constants.ts";
import { AppError } from "../../../../domain/errors/app.errors.ts";
import type { ForgotRolePasswordDto } from "../../../dto/auth.dto.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IForgotPasswordUseCase } from "../../../repositories/auth/IForgotPasswordUseCase.ts";

export class ForgotDoctorPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _cacheService: ICacheService,
    private readonly _mailService: IMailService,
  ) {}

  async execute(data: ForgotRolePasswordDto): Promise<void> {
    const { email, role } = data;
    const user = await this._userRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new NotFoundError("User");
    }

    if (user.role != role) {
      throw new AppError("Access Denied");
    }

    if (!user.isActive) {
      throw new AppError("User is inactive or blocked");
    }

    // const clinic = await this._clinicRepository.findByUserId(user.id);

    // if (!clinic) {
    //   throw new NotFoundError("Clinic");
    // }

    // if (!clinic.isActive || clinic.status === "PENDING") {
    //   throw new AppError(
    //     "Clinic is under review. You can change your password after approval.",
    //   );
    // }

    const resetToken = generateVerificationToken();

    await this._cacheService.set(`reset:${resetToken}`, { email }, 3600);

    const resetLink = `${process.env.CLIENT_ORIGIN}/clinic/change-password?token=${resetToken}`;

    const emailBody = `
      ${EMAIL_BODY.RESET_PASSWORD}
      <p>Please click the button below to reset your password. This link will expire in 1 hour.</p>
      <a href="${resetLink}" 
         style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;">
        Reset Password
      </a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await this._mailService.sendMail(
      email,
      EMAIL_SUBJECTS.RESET_PASSWORD,
      emailBody,
    );
  }
}
