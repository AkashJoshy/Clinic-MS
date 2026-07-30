import type { otpDetails } from "@/types/auth"


export const OTP_VERIFICATION_DETAILS: otpDetails = { 
    backRoute: "",
    title: "Verify OTP code",
    description: "We sent a 6-digit verification code to your registered email address. Please enter it below to continue.",
    isResend: true
}


export const TWO_FACTOR_VERIFICATION_DETAILS: otpDetails = {
    backRoute: "",
    title: "Two-Factor Authentication",
    description: "Enter the 6-digit code from your authenticator app",
    isResend: false
}

