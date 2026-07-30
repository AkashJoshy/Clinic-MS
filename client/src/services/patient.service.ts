import api from "../api/interceptors";
import { ENDPOINTS } from "./endpoints";

export const fetchPatientProfiles = async (userId: string) => {
  try {
    const res = await api.get(ENDPOINTS.PATIENT.PROFILES(userId));
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network Error",
    };
  }
};
