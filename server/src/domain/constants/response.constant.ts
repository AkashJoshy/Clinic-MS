export const RESPONSE_MESSAGE = {
  SUCCESS: "Request completed successfully",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  FETCHED: "Resource fetched successfully",
  APPROVED: "Resource approved successfully",
  REJECTED: "Resource rejected successfully",

  ACCOUNT_AUTHENTICATED: "Account authenticated",
  ACCOUNT_CREATED: "Account created successfully",
  ACCOUNT_UPDATED: "Account updated successfully",
  ACCOUNT_DEACTIVATED: "Account deactivated successfully",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED_ACCESS: "Unauthorized access",
  BLOCKED: "Access is blocked",
  TOKEN_EXPIRED: "Session expired. Please login again",

  USER_PROFILE_RETRIEVED: "User profile retrieved successfully",
  USER_NOT_FOUND: "User not found",

  PATIENT_REGISTERED: "Patient registered successfully",
  PATIENT_UPDATED: "Patient record updated successfully",
  PATIENT_DELETED: "Patient record deleted successfully",
  PATIENT_NOT_FOUND: "Patient not found",
  PATIENT_APPOINTMENT_BOOKED: "Appointment Booked successfully",
  PATIENT_SLOT_HOLD:
    "Slot reserved successfully. Complete payment within 5 minutes",

  DOCTOR_REGISTERED: "Doctor registered successfully",

  OTP_RESENT: "Otp resend successfully",
  OTP_ACCOUNT_VERIFIED: "Account Verified",

  CLINIC_REGISTERED: "Clinic registered successfully",

  DEPARTMENT_CREATED: "Department created successfully",

  INVALID_REQUEST: "Invalid request data",
  MISSING_REQUIRED_FIELDS: "Required fields are missing",

  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later",
  SERVICE_UNAVAILABLE:
    "Service temporarily unavailable. Please try again later",
} as const;
