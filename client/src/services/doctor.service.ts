import type {
  DoctorConsultationDetails,
  DoctorProffesionalDetails,
} from "@/types/doctor";
import api from "../api/interceptors";
import { ENDPOINTS } from "./endpoints";
import type { ProfileAddress } from "@/types/patient";
import { ROLE_VALUES } from "@/constants/role.constants";
import type { ConfirmedSlots, GenerateSlotsData } from "@/types/doctor-clinic";
import type {
  BuySubscriptionWithWalletData,
  CancelSubscriptionData,
} from "@/types/doctor-subscription";
import type { CalendarDateRange } from "@/types/doctor-dashboard";

export const registerDoctor = async (doctorData: FormData) => {
  try {
    const res = await api.post(ENDPOINTS.DOCTOR.REGISTER, doctorData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      authRole: ROLE_VALUES.lower.DOCTOR,
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
    const res = await api.get(ENDPOINTS.DOCTOR.PROFILE(userId), {
      authRole: ROLE_VALUES.lower.DOCTOR,
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

export const fetchDoctorReapplication = async (token: string) => {
  try {
    const res = await api.get(ENDPOINTS.DOCTOR.REAPPLICATION_DETAILS(token));
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

export const UpdateDoctorReapplication = async (data: {
  formData: FormData;
  token: string;
}) => {
  try {
    const { formData, token } = data;
    const res = await api.patch(
      ENDPOINTS.DOCTOR.REAPPLICATION_DETAILS(token),
      formData,
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
      message: error.message || "Network Error",
    };
  }
};

export const updateDoctorProfessionalDetails = async (
  doctorData: DoctorProffesionalDetails,
) => {
  try {
    const { userId, ...data } = doctorData;
    const res = await api.put(
      ENDPOINTS.DOCTOR.PROFESSIONAL_DETAILS(userId),
      data,
      {
        authRole: ROLE_VALUES.lower.DOCTOR,
      },
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

export const updateDoctorConsultationDetails = async (
  doctorClinicData: DoctorConsultationDetails,
) => {
  try {
    const { userId, ...data } = doctorClinicData;
    const res = await api.put(
      ENDPOINTS.DOCTOR.CONSULTATION_DETAILS(userId),
      data,
      {
        authRole: ROLE_VALUES.lower.DOCTOR,
      },
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

export const updateDoctorAddress = async (addressData: ProfileAddress) => {
  try {
    const { ownerId, ...data } = addressData as ProfileAddress;
    const res = await api.put(ENDPOINTS.DOCTOR.UPDATE_ADDRESS(ownerId), data, {
      authRole: ROLE_VALUES.lower.DOCTOR,
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

export const updateDoctorProfilePicture = async (personalData: FormData) => {
  try {
    const res = await api.patch(
      ENDPOINTS.DOCTOR.UPDATE_PROFILE_PICTURE(),
      personalData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        authRole: ROLE_VALUES.lower.DOCTOR,
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

export const generateSlots = async (data: GenerateSlotsData) => {
  try {
    const { doctorClinicId, ...rest } = data;
    const res = await api.patch(
      ENDPOINTS.DOCTOR.GENERATE_SLOTS(doctorClinicId),
      rest,
      {
        authRole: ROLE_VALUES.lower.DOCTOR,
      },
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

export const confirmSlots = async (data: ConfirmedSlots) => {
  try {
    const { doctorClinicId, ...rest } = data;
    const res = await api.post(
      ENDPOINTS.DOCTOR.CONFIRM_SLOTS(doctorClinicId),
      rest,
      {
        authRole: ROLE_VALUES.lower.DOCTOR,
      },
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

export const fetchSubscriptionOverview = async () => {
  try {
    const res = await api.get(ENDPOINTS.DOCTOR.SUBSCRIPTION_OVERVIEW, {
      authRole: ROLE_VALUES.lower.DOCTOR,
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

export const buySubscriptionWithWallet = async (
  data: BuySubscriptionWithWalletData,
) => {
  try {
    const res = await api.post(
      ENDPOINTS.DOCTOR.BUY_SUBSCRIPTION_WITH_WALLET,
      data,
      {
        authRole: ROLE_VALUES.lower.DOCTOR,
      },
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

export const cancelSubscription = async (data: CancelSubscriptionData) => {
  try {
    const { planId, ...rest } = data;
    const res = await api.patch(
      ENDPOINTS.DOCTOR.CANCEL_SUBSCRIPTION(planId),
      rest,
      {
        authRole: ROLE_VALUES.lower.DOCTOR,
      },
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

export const getSubscriptionUpgardeOptions = async (doctorId: string) => {
  try {
    const res = await api.get(
      ENDPOINTS.DOCTOR.SUBSCRIPTION_UPGRADE_OPTIONS(doctorId),
      {
        authRole: ROLE_VALUES.lower.DOCTOR,
      },
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

export const getDashboardOverview = async () => {
  try {
    const res = await api.get(ENDPOINTS.DOCTOR.DASHBOARD_OVERVIEW, {
      authRole: ROLE_VALUES.lower.DOCTOR,
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

export const getCalendarSlotsByDate = async (data: CalendarDateRange) => {
  try {
    const { from, to } = data;
    const res = await api.get(
      ENDPOINTS.DOCTOR.CALENDAR_SLOTS_BY_DATE(from, to),
      {
        authRole: ROLE_VALUES.lower.DOCTOR,
      },
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
