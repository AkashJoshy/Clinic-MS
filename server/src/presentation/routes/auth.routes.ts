import { Router } from "express";
import { AUTH_ENDPOINTS } from "../endpoints/auth.endpoints.js";
import passport from "../../infrastructure/passport/passport.config.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resendOtpSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../schemas/auth/auth.schema.ts";
import { doctorRegistrationSchema } from "../schemas/doctor/doctor-register.schema.ts";
import { doctorUpload } from "../middlewares/upload.middleware.ts";
import { emailVerificationController, loginController, logoutController, passwordController, registerController, tokenController } from "../../container/index.ts";

const router = Router();

// Routes
router.post(
  AUTH_ENDPOINTS["REGISTER"]["PATIENT"],
  validate(registerSchema),
  async (req, res, next) => {
    await registerController.patientRegister(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["REGISTER"]["DOCTOR"],
  doctorUpload,
  validate(doctorRegistrationSchema),
  async (req, res, next) => {
    await registerController.doctorRegister(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["LOGIN"]["PATIENT"],
  validate(loginSchema),
  async (req, res, next) => {
    await loginController.patientLogin(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["LOGIN"]["ADMIN"],
  validate(loginSchema),
  async (req, res, next) => {
    await loginController.adminLogin(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["LOGIN"]["DOCTOR"],
  validate(loginSchema),
  async (req, res, next) => {
    await loginController.doctorLogin(req, res, next);
  },
);

router.patch(AUTH_ENDPOINTS["VERIFY_EMAIL"], async (req, res, next) => {
  (validate(verifyOtpSchema),
    await emailVerificationController.verifyEmail(req, res, next));
});

router.post(AUTH_ENDPOINTS["REFRESH_TOKEN"], async (req, res, next) => {
  await tokenController.refreshToken(req, res, next);
});

router.post(AUTH_ENDPOINTS["LOGOUT"], async (req, res, next) => {
  await logoutController.logout(req, res, next);
});

router.patch(
  AUTH_ENDPOINTS["RESEND_OTP"],
  validate(resendOtpSchema),
  async (req, res, next) => {
    await emailVerificationController.resendOtp(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["FORGOT_PASSWORD"]["PATIENT"],
  validate(forgotPasswordSchema),
  async (req, res, next) => {
    await passwordController.forgotPassword(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["FORGOT_PASSWORD"]["DOCTOR"],
  validate(forgotPasswordSchema),
  async (req, res, next) => {
    await passwordController.forgotPassword(req, res, next);
  },
);

router.post(
  AUTH_ENDPOINTS["FORGOT_PASSWORD"]["ADMIN"],
  validate(forgotPasswordSchema),
  async (req, res, next) => {
    await passwordController.forgotPassword(req, res, next);
  },
);

router.patch(AUTH_ENDPOINTS["RESET_PASSWORD"]["PATIENT"], async (req, res, next) => {
  (validate(resetPasswordSchema),
    await passwordController.resetPassword(req, res, next));
});

router.patch(
  AUTH_ENDPOINTS["RESET_PASSWORD"]["DOCTOR"],
  validate(resetPasswordSchema),
  async (req, res, next) => {
    await passwordController.resetPassword(req, res, next);
  },
);


router.patch(AUTH_ENDPOINTS["RESET_PASSWORD"]["ADMIN"], async (req, res, next) => {
  (validate(resetPasswordSchema),
    await passwordController.resetPassword(req, res, next));
});

router.get(AUTH_ENDPOINTS["GOOGLE"]["BASE"], (req, res, next) => {
  const mode = req.query.mode === "signup" ? "signup" : "login";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    state: mode,
    prompt: "select_account",
  })(req, res, next);
});

router.get(
  AUTH_ENDPOINTS["GOOGLE"]["CALLBACK"],
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_ORIGIN}/login`,
  }),
  async (req, res, next) => {
    const mode = req.query.state;
    if (mode === "login") {
      await loginController.patientGoogleLogin(req, res, next);
    } else if (mode === "signup") {
      await registerController.patientGoogleRegister(req, res, next);
    }
  },
);

export default router;
