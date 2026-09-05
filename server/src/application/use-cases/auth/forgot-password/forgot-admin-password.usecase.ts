import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { ICacheService } from "../../../../domain/services/cache.service.ts";
import type { IMailService } from "../../../../domain/services/email.service.ts";
import { generateVerificationToken } from "../../../../shared/utils/token.helper.js";
import {
  EMAIL_BODY,
  EMAIL_SUBJECTS,
} from "../../../../domain/constants/email.constants.js";
import { AppError } from "../../../../domain/errors/app.errors.js";
import type { ForgotRolePasswordDto } from "../../../dto/auth.dto.ts";
import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IForgotPasswordUseCase } from "../../../repositories/auth/i-forgot-password.usecase.ts";
import { ForbiddenError } from "../../../../domain/errors/forbidden.error.ts";

export class ForgotAdminPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _cacheService: ICacheService,
    private readonly _mailService: IMailService,
  ) {}

  async execute(data: ForgotRolePasswordDto): Promise<void> {
    const { email, role } = data;
    const user = await this._userRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new NotFoundError(
        "No account is registered with this email address",
      );
    }

    if (user.role !== "ADMIN" || user.role !== role) {
      throw new ForbiddenError("This email is not registered");
    }

    if (!user.isActive) {
      throw new ForbiddenError("Account is currently inactive");
    }

    if (user.isBlocked) {
      throw new ForbiddenError("Account is currently blocked");
    }

    const resetToken = generateVerificationToken();

    await this._cacheService.set(`reset:${resetToken}`, { email }, 3600);

    const resetLink = `${process.env.CLIENT_ORIGIN}/admin/change-password?token=${resetToken}`;

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
