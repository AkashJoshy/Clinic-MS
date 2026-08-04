import type { PersonalProfile, ProfileAddress, ProfileDto } from "@/types/patient";
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

export const updatePatientProfile = async(personalData: PersonalProfile) => {
  try {
    const {
      id, ...data
    } = personalData
    const res = await api.patch(ENDPOINTS.PATIENT.UPDATE_PROFILE(id), data);
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network Error",
    }
  }
}

export const updatePatientProfilePicture = async(personalData: FormData) => {
  try {
    const res = await api.patch(ENDPOINTS.PATIENT.UPDATE_PROFILE_PICTURE(), personalData, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network Error",
    }
  }
}

export const updateAddressProfile = async(addressData: ProfileAddress) => {
  try {
    const {
      ownerId,
      ...data
    } = addressData as ProfileAddress
    const res = await api.patch(ENDPOINTS.PATIENT.UPDATE_ADDRESS(ownerId), data);
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

export const createPatientProfile = async (profileData: ProfileDto) => {
  try {
    const res = await api.post(ENDPOINTS.PATIENT.CREATE_PROFILE, profileData);
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network Error",
    }
  }
};