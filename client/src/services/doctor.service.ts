import type { DoctorConsultationDetails, DoctorProffesionalDetails } from "@/types/doctor";
import api from "../api/interceptors";
import { ENDPOINTS } from "./endpoints";
import type { ProfileAddress } from "@/types/patient";

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
    if (error.response) {
      throw error.response.data;
    }

    return {
      success: false,
      message: error.message || "Network Error",
    };
  }
};

export const updateDoctorProfessionalDetails = async(doctorData: DoctorProffesionalDetails) => {
  try {
    const { userId, ...data } = doctorData
    const res = await api.put(ENDPOINTS.DOCTOR.PROFESSIONAL_DETAILS(userId), data);
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

export const updateDoctorConsultationDetails = async(doctorClinicData: DoctorConsultationDetails) => {
  try {
    const { userId, ...data } = doctorClinicData
    const res = await api.put(ENDPOINTS.DOCTOR.CONSULTATION_DETAILS(userId), data);
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

export const updateDoctorAddress = async (addressData: ProfileAddress) => {
  try {
    const { ownerId, ...data } = addressData as ProfileAddress;
    const res = await api.put(
      ENDPOINTS.DOCTOR.UPDATE_ADDRESS(ownerId),
      data,
    );
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

export const updateDoctorProfilePicture = async (personalData: FormData) => {
  try {
    const res = await api.patch(
      ENDPOINTS.DOCTOR.UPDATE_PROFILE_PICTURE(),
      personalData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network Error",
    };
  }
};