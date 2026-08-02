import type { LocationDto } from "@/types/patient";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_OTP: "/auth/resend-otp",
    ADMIN_LOGIN: "/auth/admin/login",
    DOCTOR_LOGIN: "/auth/doctor/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    FORGOT_CLINIC_PASSWORD: "/auth/clinic/forgot-password",
    FORGOT_ADMIN_PASSWORD: "/auth/admin/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    RESET_CLINIC_PASSWORD: "/auth/clinic/reset-password",
    RESET_ADMIN_PASSWORD: "/auth/admin/reset-password",
    GOOGLE: "/auth/google",
    GOOGLE_CALLBACK: "/auth/google/callback",
  },
  ADMIN: {
    ADD_DEPARTMENT: "/admin/departments",
    DOCTORS: "/admin/doctors",
    DEPARTMENT: (id: string) => `/admin/departments/${id}`,
    UPDATE_CLINIC_STATUS: (clinicId: string) => `/admin/clinics/${clinicId}`,
  },
  PATIENT: {
    PROFILES: (userId: string) => `/patient/profiles/${userId}`,
  },
  COMMON: {
    DEPARTMENTS: `/common/departments`,
  },
  DOCTOR: {
    REGISTER: `/doctor/register`,
    PROFILE: (userId: string) => `/doctor/profile/${userId}`
  }
};
