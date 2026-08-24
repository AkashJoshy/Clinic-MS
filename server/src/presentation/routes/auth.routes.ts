import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository.ts";
import { PatientRepository } from "../../infrastructure/repositories/patient.repository.ts";
import { ArgonHashService } from "../../infrastructure/services/ArgonHashService.ts";
import { NodeMailerService } from "../../infrastructure/services/mail/NodeMailerService.ts";
import { RedisCacheService } from "../../infrastructure/services/RedisCacheService.js";
import { redis } from "../../infrastructure/cache/redis.client.js";
import { VerifyEmailController } from "../controllers/auth/verify-email.controller.ts";
import { ResendOtpController } from "../controllers/auth/resend-otp.controller.ts";
import { AUTH_ENDPOINTS } from "../endpoints/auth.endpoints.js";
import { JWTService } from "../../infrastructure/services/JWTService.js";
import { UserCreationService } from "../../application/services/user-creation.service.js";
import { PatientRegisterController } from "../controllers/auth/patient-register.controller.ts";
import { AdminLoginController } from "../controllers/auth/admin-login.controller.ts";
import { EmailVerificationService } from "../../application/services/email-verification.service.js";
import { UserExistenceService } from "../../application/services/user-existence.service.ts";
import { PatientLoginController } from "../controllers/auth/patient-login.controller.ts";
import { DoctorLoginController } from "../controllers/auth/doctor-login.controller.ts";
import { AddressRepository } from "../../infrastructure/repositories/address.repository.ts";
import { ForgotPasswordUseCase } from "../../application/use-cases/auth/forgot-password/forgot-password.usecase.ts";
import { ResetPasswordUseCase } from "../../application/use-cases/auth/reset-password/reset-password.usecase.ts";
import { ForgotPasswordController } from "../controllers/auth/forgot-password.controller.ts";
import { ResetPasswordController } from "../controllers/auth/reset-password.controller.ts";
import passport from "../../infrastructure/passport/passport.config.ts";
import { PatientGoogleLoginUseCase } from "../../application/use-cases/auth/login/patient-google-login.usecase.ts";
import { PatientGoogleLoginController } from "../controllers/auth/patient-google-login.controller.ts";
import { PatientGoogleRegisterUseCase } from "../../application/use-cases/auth/register/patient-google-register.usecase.ts";
import { PatientGoogleRegisterController } from "../controllers/auth/patient-google-register.controller.ts";
import { VerifyEmailUseCase } from "../../application/use-cases/auth/verify-email/verify-email.usecase.ts";
import { ForgotDoctorPasswordUseCase } from "../../application/use-cases/auth/forgot-password/forgot-doctor-password.usecase.ts";
import { ResetDoctorPasswordUseCase } from "../../application/use-cases/auth/reset-password/reset-doctor-password.usecase.ts";
import { ForgotAdminPasswordUseCase } from "../../application/use-cases/auth/forgot-password/forgot-admin-password.usecase.ts";
import { ResetAdminPasswordUseCase } from "../../application/use-cases/auth/reset-password/reset-admin-password.usecase.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { PatientRegisterUseCase } from "../../application/use-cases/auth/register/patient-register.usecase.ts";
import { ResendOtp } from "../../application/use-cases/auth/resend-otp/resend-otp.usecase.ts";
import { PatientLoginUseCase } from "../../application/use-cases/auth/login/patient-login.usecase.ts";
import { AdminLoginUseCase } from "../../application/use-cases/auth/login/admin-login.usecase.ts";
import { DoctorLoginUseCase } from "../../application/use-cases/auth/login/doctor-login.usecase.ts";
import { DoctorRepository } from "../../infrastructure/repositories/doctor.repository.ts";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resendOtpSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../schemas/auth/auth.schema.ts";
import { AccessTokenGenerationService } from "../../application/services/access-token.service.ts";
import { RefreshTokenGenerationService } from "../../application/services/refresh-token.service.ts";
import { RefreshSessionRepository } from "../../infrastructure/repositories/refresh-session.repository.ts";
import { RefreshTokenController } from "../controllers/auth/refresh-token.controller.ts";
import { RefreshTokenUseCase } from "../../application/use-cases/auth/refresh-token/refresh-token.usecase.ts";
import { LogoutController } from "../controllers/auth/logout.controller.ts";
import { LogoutUseCase } from "../../application/use-cases/auth/logout/logout.usecase.ts";
import { authorizeUser } from "../middlewares/authorize-user.middleware.ts";

const router = Router();

// DB Repo's
const mongooseUserRepository = new UserRepository();
const mongoosePatientRepository = new PatientRepository();
const mongooseAddressRepository = new AddressRepository();
const mongooseDoctorRepository = new DoctorRepository();
const mongooseRefreshSessionRepository = new RefreshSessionRepository();

// Services
const argonHashService = new ArgonHashService();
const redisService = new RedisCacheService(redis);
const nodemailService = new NodeMailerService();
const jwtService = new JWTService();

// Service-Usecase
const userCreationService = new UserCreationService(
  mongooseUserRepository,
  argonHashService,
);
const emailVerificationService = new EmailVerificationService(
  nodemailService,
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

const resendOtpUseCase = new ResendOtp(redisService, nodemailService);

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
  nodemailService,
);

const forgotDoctorPasswordUseCase = new ForgotDoctorPasswordUseCase(
  mongooseUserRepository,
  redisService,
  nodemailService,
);

const forgotAdminPasswordUseCase = new ForgotAdminPasswordUseCase(
  mongooseUserRepository,
  redisService,
  nodemailService,
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
  mongooseUserRepository,
  mongoosePatientRepository,
  mongooseAddressRepository,
  nodemailService,
);

// Controllers
const patientRegisterController = new PatientRegisterController(
  patientRegister,
);
const patientLoginController = new PatientLoginController(patientLoginUseCase);

const adminLoginController = new AdminLoginController(adminLoginUseCase);

const doctorLoginController = new DoctorLoginController(doctorLoginUseCase);

const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

const logoutController = new LogoutController(logoutUseCase);

const verifyEmailController = new VerifyEmailController(verifyEmailUseCase);

const resendOtpController = new ResendOtpController(resendOtpUseCase);

const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase,
);

const forgotDoctorPasswordController = new ForgotPasswordController(
  forgotDoctorPasswordUseCase,
);

const forgotAdminPasswordController = new ForgotPasswordController(
  forgotAdminPasswordUseCase,
);

const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase,
);

const resetDoctorPasswordController = new ResetPasswordController(
  resetDoctorPasswordUseCase,
);

const resetAdminPasswordController = new ResetPasswordController(
  resetAdminPasswordUseCase,
);

const patientGoogleLoginController = new PatientGoogleLoginController(
  patientGoogleLoginUseCase,
);

const patientGoogleRegisterController = new PatientGoogleRegisterController(
  patientGoogleRegisterUseCase,
);

// Routes
router.post(
  AUTH_ENDPOINTS["PATIENT_REGISTER"],
  validate(registerSchema),
  async (req, res, next) => {
    await patientRegisterController.handle(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["PATIENT_LOGIN"],
  validate(loginSchema),
  async (req, res, next) => {
    await patientLoginController.handle(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["ADMIN_LOGIN"],
  validate(loginSchema),
  async (req, res, next) => {
    await adminLoginController.handle(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["DOCTOR_LOGIN"],
  validate(loginSchema),
  async (req, res, next) => {
    await doctorLoginController.handle(req, res, next);
  },
);

router.patch(AUTH_ENDPOINTS["VERIFY_EMAIL"], async (req, res, next) => {
  (validate(verifyOtpSchema),
    await verifyEmailController.handle(req, res, next));
});

router.post(AUTH_ENDPOINTS["REFRESH_TOKEN"], async (req, res, next) => {
  await refreshTokenController.handle(req, res, next);
});

router.post(AUTH_ENDPOINTS["LOGOUT"], async (req, res, next) => {
  await logoutController.handle(req, res, next);
});

router.patch(
  AUTH_ENDPOINTS["RESEND_OTP"],
  validate(resendOtpSchema),
  async (req, res, next) => {
    await resendOtpController.handle(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["FORGOT_PASSWORD"],
  validate(forgotPasswordSchema),
  async (req, res, next) => {
    await forgotPasswordController.handle(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["FORGOT_DOCTOR_PASSWORD"],
  validate(forgotPasswordSchema),
  async (req, res, next) => {
    await forgotDoctorPasswordController.handle(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["FORGOT_ADMIN_PASSWORD"],
  validate(forgotPasswordSchema),
  async (req, res, next) => {
    await forgotAdminPasswordController.handle(req, res, next);
  },
);

router.patch(AUTH_ENDPOINTS["RESET_PASSWORD"], async (req, res, next) => {
  (validate(resetPasswordSchema),
    await resetPasswordController.handle(req, res, next));
});

router.patch(
  AUTH_ENDPOINTS["RESET_DOCTOR_PASSWORD"],
  validate(resetPasswordSchema),
  async (req, res, next) => {
    await resetDoctorPasswordController.handle(req, res, next);
  },
);

router.patch(AUTH_ENDPOINTS["RESET_ADMIN_PASSWORD"], async (req, res, next) => {
  (validate(resetPasswordSchema),
    await resetAdminPasswordController.handle(req, res, next));
});

router.get(AUTH_ENDPOINTS["GOOGLE"], (req, res, next) => {
  const mode = req.query.mode === "signup" ? "signup" : "login";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    state: mode,
  })(req, res, next);
});

router.get(
  AUTH_ENDPOINTS["GOOGLE_CALLBACK"],
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_ORIGIN}/login`,
  }),
  async (req, res, next) => {
    const mode = req.query.state;
    if (mode === "login") {
      await patientGoogleLoginController.handle(req, res, next);
    } else if (mode === "signup") {
      await patientGoogleRegisterController.handle(req, res, next);
    }
  },
);

export default router;
