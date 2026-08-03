import api from "../api/interceptors";
import { ENDPOINTS } from "./endpoints";

export const registerDoctor = async (doctorData: FormData) => {
  try {
    const res = await api.post(ENDPOINTS.DOCTOR.REGISTER, doctorData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
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

export const fetchDoctorProfile = async (userId: string) => {
  try {
    const res = await api.get(ENDPOINTS.DOCTOR.PROFILE(userId));
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network Error",
    };
  }
};

