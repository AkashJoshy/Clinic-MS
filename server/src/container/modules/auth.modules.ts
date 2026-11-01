import { EmailVerificationService } from "../../application/services/shared/user/email-verification.service.ts";
import { RefreshTokenGenerationService } from "../../application/services/shared/token/refresh-token.service.ts";
import { UserCreationService } from "../../application/services/shared/user/user-creation.service.ts";
import { UserExistenceService } from "../../application/services/shared/user/user-existence.service.ts";
import { WalletCreationService } from "../../application/services/wallet/wallet-creation.service.ts";
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
import { DoctorRegisterUseCase } from "../../application/use-cases/auth/register/doctor-register.usecase.ts";
import { EmailVerificationController } from "../../presentation/controllers/auth/email-verification.controller.ts";
import { LoginController } from "../../presentation/controllers/auth/login.controller.ts";
import { LogoutController } from "../../presentation/controllers/auth/logout.controller.ts";
import { PasswordController } from "../../presentation/controllers/auth/password.controller.ts";
import { RegisterController } from "../../presentation/controllers/auth/register.controller.ts";
import { TokenController } from "../../presentation/controllers/auth/token.controller.ts";
import {
  argonHashService,
  jwtService,
  mongooseAddressRepository,
  mongooseClinicRepository,
  mongooseDoctorClinicRepository,
  mongooseDoctorRepository,
  mongoosePatientRepository,
  mongooseRefreshSessionRepository,
  mongooseUserRepository,
  mongooseWalletRepository,
  nodeMailService,
  redisService,
} from "../infrastructure.container.ts";
import { AccessTokenGenerationService } from "../../application/services/shared/token/access-token.service.ts";

// Service-Usecase
const walletCreationService = new WalletCreationService(
  mongooseWalletRepository,
);
const userCreationService = new UserCreationService(
  mongooseUserRepository,
  argonHashService,
  walletCreationService,
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

const doctorRegisterUseCase = new DoctorRegisterUseCase(
  mongooseDoctorRepository,
  mongooseDoctorClinicRepository,
  mongooseClinicRepository,
  mongooseAddressRepository,
  userCreationService,
  emailVerificationService,
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
export const registerController = new RegisterController(
  patientRegister,
  patientGoogleRegisterUseCase,
  doctorRegisterUseCase,
);

export const loginController = new LoginController(
  adminLoginUseCase,
  doctorLoginUseCase,
  patientLoginUseCase,
  patientGoogleLoginUseCase,
);

export const logoutController = new LogoutController(logoutUseCase);

export const passwordController = new PasswordController(
  forgotPasswordUseCase,
  resetPasswordUseCase,
);

export const tokenController = new TokenController(refreshTokenUseCase);

export const emailVerificationController = new EmailVerificationController(
  verifyEmailUseCase,
  resendOtpUseCase,
);
