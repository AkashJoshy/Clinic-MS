import { Router } from "express";
import { MongooseUserRepository } from "../../infrastructure/repositories/mongoose-user.repository.js";
import { MongoosePatientRepository } from "../../infrastructure/repositories/mongoose-patient.repository.js";
import { ArgonPasswordService } from "../../infrastructure/services/ArgonPasswordService.js";
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
import { TokenGenerationService } from "../../application/services/token.service.ts";
import { DoctorLoginController } from "../controllers/auth/doctor-login.controller.ts";
import { MongooseAddressRepository } from "../../infrastructure/repositories/mongoose-address.repository.ts";
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
import { loginSchema } from "../schemas/auth/login.schema.ts";
import { registerSchema } from "../schemas/auth/patient-register.schema.ts";
import { verifyOtpSchema } from "../schemas/auth/verify-otp.schema.ts";
import { resendOtpSchema } from "../schemas/auth/resend-otp.schema.ts";
import { forgotPasswordSchema } from "../schemas/auth/forgot-password.schema.ts";
import { resetPasswordSchema } from "../schemas/auth/reset-password.schema.ts";
import { PatientRegisterUseCase } from "../../application/use-cases/auth/register/patient-register.usecase.ts";
import { ResendOtp } from "../../application/use-cases/auth/resend-otp/resend-otp.usecase.ts";
import { PatientLoginUseCase } from "../../application/use-cases/auth/login/patient-login.usecase.ts";
import { AdminLoginUseCase } from "../../application/use-cases/auth/login/admin-login.usecase.ts";
import { DoctorLoginUseCase } from "../../application/use-cases/auth/login/doctor-login.usecase.ts";

const router = Router();

// DB Repo's
const mongooseUserRepository = new MongooseUserRepository();
const mongoosePatientRepository = new MongoosePatientRepository();
const mongooseAddressRepository = new MongooseAddressRepository();

// Services
const argonPasswordService = new ArgonPasswordService();
const redisService = new RedisCacheService(redis);
const nodemailService = new NodeMailerService();
const jwtService = new JWTService();

// Service-Usecase
const userCreationService = new UserCreationService(
  mongooseUserRepository,
  argonPasswordService,
);
const emailVerificationService = new EmailVerificationService(
  nodemailService,
  redisService,
);
const userExistenceService = new UserExistenceService(
  mongooseUserRepository,
  argonPasswordService,
);
const tokenGenerationService = new TokenGenerationService(jwtService);

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
const resendOtp = new ResendOtp(redisService, nodemailService);
const patientLogin = new PatientLoginUseCase(
  userExistenceService,
  tokenGenerationService,
  emailVerificationService,
);
const adminLogin = new AdminLoginUseCase(
  userExistenceService,
  tokenGenerationService,
);
const doctorLoginUseCase = new DoctorLoginUseCase(
  userExistenceService,
  tokenGenerationService,
  emailVerificationService,
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
  argonPasswordService,
);
const resetDoctorPasswordUseCase = new ResetDoctorPasswordUseCase(
  mongooseUserRepository,
  redisService,
  argonPasswordService,
);
const resetAdminPasswordUseCase = new ResetAdminPasswordUseCase(
  mongooseUserRepository,
  redisService,
  argonPasswordService,
);
const patientGoogleLoginUseCase = new PatientGoogleLoginUseCase(
  tokenGenerationService,
  mongooseUserRepository,
);
const patientGoogleRegisterUseCase = new PatientGoogleRegisterUseCase(
  tokenGenerationService,
  mongooseUserRepository,
  mongoosePatientRepository,
  mongooseAddressRepository,
  nodemailService,
);

// Controllers
const patientRegisterController = new PatientRegisterController(
  patientRegister,
);
const patientLoginController = new PatientLoginController(patientLogin);
const adminLoginController = new AdminLoginController(adminLogin);
const doctorLoginController = new DoctorLoginController(doctorLoginUseCase);
const verifyEmailController = new VerifyEmailController(verifyEmailUseCase);
const resendOtpController = new ResendOtpController(resendOtp);
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
