import { AccessTokenGenerationService } from "../../application/services/access-token.service.ts";
import { EmailVerificationService } from "../../application/services/email-verification.service.ts";
import { RefreshTokenGenerationService } from "../../application/services/refresh-token.service.ts";
import { UserCreationService } from "../../application/services/user-creation.service.ts";
import { UserExistenceService } from "../../application/services/user-existence.service.ts";
import { ForgotAdminPasswordUseCase } from "../../application/use-cases/auth/forgot-password/forgot-admin-password.usecase.ts";
import { ForgotDoctorPasswordUseCase } from "../../application/use-cases/auth/forgot-password/forgot-doctor-password.usecase.ts";
import { ForgotPasswordUseCase } from "../../application/use-cases/auth/forgot-password/forgot-password.usecase.ts";
import { AdminLoginUseCase } from "../../application/use-cases/auth/login/admin-login.usecase.ts";
import { DoctorLoginUseCase } from "../../application/use-cases/auth/login/doctor-login.usecase.ts";
import { PatientGoogleLoginUseCase } from "../../application/use-cases/auth/login/patient-google-login.usecase.ts";
import { PatientLoginUseCase } from "../../application/use-cases/auth/login/patient-login.usecase.ts";
import { LogoutUseCase } from "../../application/use-cases/auth/logout/logout.usecase.ts";
import { RefreshTokenUseCase } from "../../application/use-cases/auth/refresh-token/refresh-token.usecase.ts";
import { PatientGoogleRegisterUseCase } from "../../application/use-cases/auth/register/patient-google-register.usecase.ts";
import { PatientRegisterUseCase } from "../../application/use-cases/auth/register/patient-register.usecase.ts";
import { ResendOtp } from "../../application/use-cases/auth/resend-otp/resend-otp.usecase.ts";
import { ResetAdminPasswordUseCase } from "../../application/use-cases/auth/reset-password/reset-admin-password.usecase.ts";
import { ResetDoctorPasswordUseCase } from "../../application/use-cases/auth/reset-password/reset-doctor-password.usecase.ts";
import { ResetPasswordUseCase } from "../../application/use-cases/auth/reset-password/reset-password.usecase.ts";
import { VerifyEmailUseCase } from "../../application/use-cases/auth/verify-email/verify-email.usecase.ts";
import { AdminLoginController } from "../../presentation/controllers/auth/admin-login.controller.ts";
import { DoctorLoginController } from "../../presentation/controllers/auth/doctor-login.controller.ts";
import { ForgotPasswordController } from "../../presentation/controllers/auth/forgot-password.controller.ts";
import { LogoutController } from "../../presentation/controllers/auth/logout.controller.ts";
import { PatientGoogleLoginController } from "../../presentation/controllers/auth/patient-google-login.controller.ts";
import { PatientGoogleRegisterController } from "../../presentation/controllers/auth/patient-google-register.controller.ts";
import { PatientLoginController } from "../../presentation/controllers/auth/patient-login.controller.ts";
import { PatientRegisterController } from "../../presentation/controllers/auth/patient-register.controller.ts";
import { RefreshTokenController } from "../../presentation/controllers/auth/refresh-token.controller.ts";
import { ResendOtpController } from "../../presentation/controllers/auth/resend-otp.controller.ts";
import { ResetPasswordController } from "../../presentation/controllers/auth/reset-password.controller.ts";
import { VerifyEmailController } from "../../presentation/controllers/auth/verify-email.controller.ts";
import {
  argonHashService,
  jwtService,
  mongooseAddressRepository,
  mongooseDoctorRepository,
  mongoosePatientRepository,
  mongooseRefreshSessionRepository,
  mongooseUserRepository,
  nodeMailService,
  redisService,
} from "../infrastructure.container.ts";

// Service-Usecase
const userCreationService = new UserCreationService(
  mongooseUserRepository,
  argonHashService,
);
const emailVerificationService = new EmailVerificationService(
  nodeMailService,
  redisService,
);
const userExistenceService = new UserExistenceService(
  mongooseUserRepository,
  argonHashService,
);
const accessTokenGenerationService = new AccessTokenGenerationService(
  jwtService,
);
const refreshTokenGenerationService = new RefreshTokenGenerationService(
  jwtService,
  mongooseRefreshSessionRepository,
  argonHashService,
);

// Use-cases
const patientRegister = new PatientRegisterUseCase(
  userCreationService,
  mongoosePatientRepository,
  emailVerificationService,
  mongooseAddressRepository,
);

const verifyEmailUseCase = new VerifyEmailUseCase(
  mongooseUserRepository,
  redisService,
);

const resendOtpUseCase = new ResendOtp(redisService, nodeMailService);

const patientLoginUseCase = new PatientLoginUseCase(
  userExistenceService,
  accessTokenGenerationService,
  refreshTokenGenerationService,
  emailVerificationService,
);

const adminLoginUseCase = new AdminLoginUseCase(
  userExistenceService,
  accessTokenGenerationService,
  refreshTokenGenerationService,
);

const doctorLoginUseCase = new DoctorLoginUseCase(
  userExistenceService,
  emailVerificationService,
  mongooseDoctorRepository,
  accessTokenGenerationService,
  refreshTokenGenerationService,
);

const refreshTokenUseCase = new RefreshTokenUseCase(
  mongooseUserRepository,
  mongooseRefreshSessionRepository,
  argonHashService,
  jwtService,
  accessTokenGenerationService,
);
const logoutUseCase = new LogoutUseCase(
  mongooseUserRepository,
  mongooseRefreshSessionRepository,
  argonHashService,
  jwtService,
);

const forgotPasswordUseCase = new ForgotPasswordUseCase(
  mongooseUserRepository,
  mongoosePatientRepository,
  redisService,
  nodeMailService,
);

const forgotDoctorPasswordUseCase = new ForgotDoctorPasswordUseCase(
  mongooseUserRepository,
  redisService,
  nodeMailService,
);

const forgotAdminPasswordUseCase = new ForgotAdminPasswordUseCase(
  mongooseUserRepository,
  redisService,
  nodeMailService,
);

const resetPasswordUseCase = new ResetPasswordUseCase(
  mongooseUserRepository,
  mongoosePatientRepository,
  redisService,
  argonHashService,
);

const resetDoctorPasswordUseCase = new ResetDoctorPasswordUseCase(
  mongooseUserRepository,
  redisService,
  argonHashService,
);

const resetAdminPasswordUseCase = new ResetAdminPasswordUseCase(
  mongooseUserRepository,
  redisService,
  argonHashService,
);

const patientGoogleLoginUseCase = new PatientGoogleLoginUseCase(
  accessTokenGenerationService,
  refreshTokenGenerationService,
  mongooseUserRepository,
);

const patientGoogleRegisterUseCase = new PatientGoogleRegisterUseCase(
  accessTokenGenerationService,
  refreshTokenGenerationService,
  mongooseUserRepository,
  mongoosePatientRepository,
  mongooseAddressRepository,
  nodeMailService,
);

// Controllers
export const patientRegisterController = new PatientRegisterController(
  patientRegister,
);

export const patientLoginController = new PatientLoginController(
  patientLoginUseCase,
);

export const adminLoginController = new AdminLoginController(adminLoginUseCase);

export const doctorLoginController = new DoctorLoginController(
  doctorLoginUseCase,
);

export const refreshTokenController = new RefreshTokenController(
  refreshTokenUseCase,
);

export const logoutController = new LogoutController(logoutUseCase);

export const verifyEmailController = new VerifyEmailController(
  verifyEmailUseCase,
);

export const resendOtpController = new ResendOtpController(resendOtpUseCase);

export const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase,
);

export const forgotDoctorPasswordController = new ForgotPasswordController(
  forgotDoctorPasswordUseCase,
);

export const forgotAdminPasswordController = new ForgotPasswordController(
  forgotAdminPasswordUseCase,
);

export const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase,
);

export const resetDoctorPasswordController = new ResetPasswordController(
  resetDoctorPasswordUseCase,
);

export const resetAdminPasswordController = new ResetPasswordController(
  resetAdminPasswordUseCase,
);

export const patientGoogleLoginController = new PatientGoogleLoginController(
  patientGoogleLoginUseCase,
);

export const patientGoogleRegisterController =
  new PatientGoogleRegisterController(patientGoogleRegisterUseCase);
