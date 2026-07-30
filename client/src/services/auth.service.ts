import api from "@/api/interceptors";
import type { ForgotPasswordDto, GoogleAuthMode, LoginDto, ResendOtpDto, ResetPasswordDto } from "@/types/auth";
import type { RegisterUserDto } from "@/types/auth";
import type { VerifyOtpDto } from "@/types/auth"; 
import { ENDPOINTS } from "./endpoints";

export const registerUser = async (data: RegisterUserDto) => {
  try {
    const res = await api.post(ENDPOINTS.AUTH.REGISTER, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const loginUser = async (data: LoginDto) => {
  try {
    const res = await api.post(ENDPOINTS.AUTH.LOGIN, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const verifyEmail = async (data: VerifyOtpDto) => {
  try {
    const res = await api.patch(ENDPOINTS.AUTH.VERIFY_EMAIL, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    
    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const resendOtp = async (data: ResendOtpDto) => {
  try {
    const res = await api.patch(ENDPOINTS.AUTH.RESEND_OTP, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    
    return {
      success: false,
      message: error.message || "Network Error",
    };  
  }
};

export const loginAdmin = async (data: LoginDto) => {
  try {
    const res = await api.post(ENDPOINTS.AUTH.ADMIN_LOGIN, data, {
      headers: { 'Content-Type': 'application/json' }
    })
    return res.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    
    return {
      success: false,
      message: error.message || "Network Error",
    };  
    
  }
}

export const forgotPassword = async (data: ForgotPasswordDto) => {
  try {
    const res = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const forgotClinicPassword = async (data: ForgotPasswordDto) => {
  try {
    const res = await api.post(ENDPOINTS.AUTH.FORGOT_CLINIC_PASSWORD, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const forgotAdminPassword = async (data: ForgotPasswordDto) => {
  try {
    const res = await api.post(ENDPOINTS.AUTH.FORGOT_ADMIN_PASSWORD, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const resetPassword = async (data: ResetPasswordDto) => {
  try {
    const res = await api.patch(ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const resetClinicPassword = async (data: ResetPasswordDto) => {
  try {
    const res = await api.patch(ENDPOINTS.AUTH.RESET_CLINIC_PASSWORD, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const resetAdminPassword = async (data: ResetPasswordDto) => {
  try {
    const res = await api.patch(ENDPOINTS.AUTH.RESET_ADMIN_PASSWORD, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const loginDoctor = async (data: LoginDto) => {
  try {
    const res = await api.post(ENDPOINTS.AUTH.DOCTOR_LOGIN, data, {
      headers: { 'Content-Type': 'application/json' }
    })
    return res.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    
    return {
      success: false,
      message: error.message || "Network Error",
    };  
    
  }
}

export const initiateGoogleAuth = (mode: GoogleAuthMode) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  window.location.href = `${apiUrl}${ENDPOINTS.AUTH.GOOGLE}?mode=${mode}`;
};

