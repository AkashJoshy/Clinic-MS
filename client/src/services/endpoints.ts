export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_OTP: "/auth/resend-otp",
    ADMIN_LOGIN: "/auth/admin/login",
    DOCTOR_LOGIN: "/auth/doctor/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    FORGOT_DOCTOR_PASSWORD: "/auth/doctor/forgot-password",
    FORGOT_ADMIN_PASSWORD: "/auth/admin/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    RESET_DOCTOR_PASSWORD: "/auth/doctor/reset-password",
    RESET_ADMIN_PASSWORD: "/auth/admin/reset-password",
    REFRESH_TOKEN: "/auth/refresh",
    LOGOUT: "/auth/logout",
    GOOGLE: "/auth/google",
    GOOGLE_CALLBACK: "/auth/google/callback",
  },
  ADMIN: {
    ADD_DEPARTMENT: "/admin/departments",
    DOCTORS: "/admin/doctors",
    PATIENTS: "/admin/patients",
    SUBSCRIPTION: "/admin/subscriptions",
    UPDATE_SUBSCRIPTION: (planId: string) => `/admin/subscriptions/${planId}`,
    UPDATE_SUBSCRIPTION_STATUS: (planId: string) =>
      `/admin/subscriptions/${planId}/status`,
    DOCTOR: (doctorId: string) => `/admin/doctors/${doctorId}`,
    UPDATE_DOCTOR: (doctorId: string) => `/admin/doctors/${doctorId}`,
    VERIFY_DOCTOR_DOCUMENT: (doctorId: string) =>
      `/admin/doctors/${doctorId}/verify`,
    APPROVE_DOCTOR: (doctorId: string) => `/admin/doctors/${doctorId}/approve`,
    REJECT_DOCTOR: (doctorId: string) => `/admin/doctors/${doctorId}/reject`,
    DEPARTMENT: (id: string) => `/admin/departments/${id}`,
    UPDATE_CLINIC_STATUS: (clinicId: string) => `/admin/clinics/${clinicId}`,
    VERIFY_CLINIC_DOCUMENT: (clinicId: string) =>
      `/admin/clinic/${clinicId}/verify`,
    PATIENT: (patientId: string) => `/admin/patients/${patientId}`,
  },
  PATIENT: {
    CREATE_PROFILE: `/patient/profiles`,
    DOCTORS: `/patient/doctors`,
    PROFILES: (userId: string) => `/patient/profiles/${userId}`,
    UPDATE_PROFILE: (patientId: string) => `/patient/profiles/${patientId}`,
    UPDATE_PROFILE_PICTURE: () => `/patient/profiles/picture/p`,
    UPDATE_ADDRESS: (onwerId: string) =>
      `/patient/profiles/addressess/${onwerId}`,
    UPDATE_EMERGENCY_CONTACT: (patientId: string) =>
      `/patient/profiles/emergency-contact/${patientId}`,
  },
  COMMON: {
    DEPARTMENTS: `/common/departments`,
    CREATE_WALLET_TOPUP_ORDER: `/common/wallet/top-up/orders`,
    VERIFY_WALLET_TOPUP_ORDER: `/common/wallet/top-up/orders/verify`,
    GET_WALLET: (ownerId: string) => `/common/wallet/${ownerId}`,
    GET_WALLET_BALANCE: (ownerId: string) =>
      `/common/wallet/${ownerId}/balance`,
  },
  DOCTOR: {
    REGISTER: `/doctor/register`,
    DASHBOARD_OVERVIEW: `/doctor/dashboard/overview`,
    SUBSCRIPTION_OVERVIEW: `/doctor/subscriptions/overview`,
    BUY_SUBSCRIPTION_WITH_WALLET: `/doctor/subscriptions/purchase/wallet`,
    BUY_SUBSCRIPTION_WITH_RAZORPAY: `/doctor/subscriptions/purchase/razorpay`,
    VERIFY_SUBSCRIPTION_RAZORPAY: `/doctor/subscriptions/purchase/razorpay/verify`,
    CALENDAR_SLOTS_BY_DATE: (from: Date, to: Date) => `/doctor/calendar/slots?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}`,
    SUBSCRIPTION_UPGRADE_OPTIONS: (doctorId: string) =>
      `/doctor/subscriptions/${doctorId}/upgrade-options`,
    CANCEL_SUBSCRIPTION: (planId: string) =>
      `/doctor/subscriptions/${planId}/cancel`,
    PROFILE: (userId: string) => `/doctor/profile/${userId}`,
    PROFESSIONAL_DETAILS: (userId: string) =>
      `/doctor/${userId}/professional-details`,
    CONSULTATION_DETAILS: (userId: string) =>
      `/doctor/${userId}/consultation-details`,
    UPDATE_ADDRESS: (onwerId: string) => `/doctor/addressess/${onwerId}`,
    UPDATE_PROFILE_PICTURE: () => `/doctor/profile-picture`,
    REAPPLICATION_DETAILS: (token: string) =>
      `/doctor/reapplications/token/${token}`,
    GENERATE_SLOTS: (doctorClinicId: string) =>
      `/doctor/clinics/${doctorClinicId}/slots/generate`,
    CONFIRM_SLOTS: (doctorClinicId: string) =>
      `/doctor/clinics/${doctorClinicId}/slots/confirm`,
  },
};
