import type { ProfileAddress } from "@/types/patient";
import api from "../api/interceptors"
import { ENDPOINTS } from "./endpoints";


export const getAllDepartments = async () => {
    try {
      const res = await api.get(ENDPOINTS.COMMON.DEPARTMENTS);
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
}

