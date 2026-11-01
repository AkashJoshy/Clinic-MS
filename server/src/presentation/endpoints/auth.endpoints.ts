
const DOCTOR_BASE = "/doctor";
const ADMIN_BASE = "/admin";

export const AUTH_ENDPOINTS = {
  LOGIN: {
    PATIENT: "/login",
    ADMIN: `${ADMIN_BASE}/login`,
    DOCTOR: `${DOCTOR_BASE}/login`,
  },
  LOGOUT: "/logout",
  REGISTER: {
    PATIENT: "/register",
    DOCTOR: `${DOCTOR_BASE}/register`,
  },
  VERIFY_EMAIL: "/verify-email",
  REFRESH_TOKEN: "/refresh",
  RESEND_OTP: "/resend-otp",
  FORGOT_PASSWORD: {
    PATIENT: "/forgot-password",
    DOCTOR: `${DOCTOR_BASE}/forgot-password`,
    ADMIN: `${ADMIN_BASE}/forgot-password`,
  },
  RESET_PASSWORD: {
    PATIENT: "/reset-password",
    DOCTOR: `${DOCTOR_BASE}/reset-password`,
    ADMIN: `${ADMIN_BASE}/reset-password`,
  },
  GOOGLE: {
    BASE: "/google",
    CALLBACK: "/google/callback",
  },
};
