import api from "@/api/interceptors";
import type {
  DepartmentData,
  DepartmentDto,
  UpdatePlatformSettingsData,
} from "@/types/admin";
import type {
  DoctorRejectDto,
  DoctorStatusUpdateDto,
  DocumentDto,
} from "@/types/doctor";
import { ENDPOINTS } from "./endpoints";
import type { DeletePatientDto } from "@/types/patient";
import type { UpdateMethods } from "@/types/common";
import { ROLE_VALUES } from "@/constants/role.constants";
import type {
  BaseSubscriptionData,
  SubscriptionPlan,
  UpdateSubscriptionStatusData,
} from "@/types/subscription";
import type { ColorPalette } from "@/types/admin/color-palette.types";
import type { ColorPaletteFormData } from "@/schemas/admin/admin.schema";

export const addDepartment = async (data: Omit<DepartmentData, "id">) => {
  try {
    const res = await api.post(ENDPOINTS.ADMIN.ADD_DEPARTMENT, data, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const updateDepartment = async (data: DepartmentDto) => {
  try {
    const res = await api.patch(
      ENDPOINTS.ADMIN.DEPARTMENT(data.id),
      {
        status: data.status,
      },
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const getDepartment = async (deptId: string) => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.DEPARTMENT(deptId), {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const editDepartment = async (departmentData: DepartmentData) => {
  try {
    const { id, ...data } = departmentData;
    const res = await api.put(ENDPOINTS.ADMIN.DEPARTMENT(id!), data, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const getAllDoctors = async () => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.DOCTORS, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const approveDoctor = async (data: DoctorStatusUpdateDto) => {
  try {
    const { id, reviewMessage } = data;
    const res = await api.patch(
      ENDPOINTS.ADMIN.APPROVE_DOCTOR(id),
      {
        reviewMessage,
      },
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const rejectDoctor = async (doctorData: DoctorRejectDto) => {
  try {
    const { doctorId, ...data } = doctorData;
    const res = await api.patch(ENDPOINTS.ADMIN.REJECT_DOCTOR(doctorId), data, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const getDoctor = async (doctorId: string) => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.DOCTOR(doctorId), {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const updateDoctorStatus = async (data: {
  id: string;
  method: UpdateMethods;
}) => {
  try {
    const { id, method } = data;
    const res = await api.patch(
      ENDPOINTS.ADMIN.UPDATE_DOCTOR(id),
      { method },
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const getAllPatients = async () => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.PATIENTS, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const getPatient = async (patientId: string) => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.PATIENT(patientId), {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const updatePatient = async (data: DeletePatientDto) => {
  try {
    const { id, method } = data;
    const res = await api.patch(
      ENDPOINTS.ADMIN.PATIENT(id),
      { method },
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const verifyDoctorDocument = async (doctorData: DocumentDto) => {
  try {
    const { id, ...data } = doctorData as DocumentDto;
    const res = await api.patch(
      ENDPOINTS.ADMIN.VERIFY_DOCTOR_DOCUMENT(id),
      data,
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const verifyClinicDocument = async (clinicData: DocumentDto) => {
  try {
    const { id, ...data } = clinicData as DocumentDto;
    const res = await api.patch(
      ENDPOINTS.ADMIN.VERIFY_CLINIC_DOCUMENT(id),
      data,
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const createNewSubscriptionPlan = async (
  planData: BaseSubscriptionData,
) => {
  try {
    const res = await api.post(ENDPOINTS.ADMIN.SUBSCRIPTION, planData, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const getAllSubscriptionPlans = async () => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.SUBSCRIPTION, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const editSubscriptionPlan = async (
  subscriptionData: SubscriptionPlan,
) => {
  try {
    const { id, ...planData } = subscriptionData;
    const res = await api.patch(
      ENDPOINTS.ADMIN.UPDATE_SUBSCRIPTION(id),
      planData,
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const updateSubscriptionPlanStatus = async (
  subscriptionData: UpdateSubscriptionStatusData,
) => {
  try {
    const { id, status } = subscriptionData;
    console.log(`Subscription Data`);
    console.log(subscriptionData);

    const res = await api.patch(
      ENDPOINTS.ADMIN.UPDATE_SUBSCRIPTION_STATUS(id),
      {
        status,
      },
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const getPlatformSettings = async () => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.PLATFORM_SETTINGS, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const updatePlatformSettings = async (
  settingsData: UpdatePlatformSettingsData,
) => {
  try {
    const res = await api.patch(
      ENDPOINTS.ADMIN.PLATFORM_SETTINGS,
      settingsData,
      {
        authRole: ROLE_VALUES.lower.ADMIN,
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

export const createColorPalette = async (data: ColorPaletteFormData) => {
  try {
    const res = await api.post(ENDPOINTS.ADMIN.CREATE_COLOR_PALETTE, data, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const getAllColorPalettes = async () => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.GET_ALL_COLOR_PALETTES, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const editColorPalette = async (data: ColorPaletteFormData) => {
  try {
    const { id, ...rest } = data;
    const res = await api.patch(ENDPOINTS.ADMIN.EDIT_COLOR_PALETTE(id!), rest, {
      authRole: ROLE_VALUES.lower.ADMIN,
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

export const toggleColorPaletteStatus = async (id: string) => {
  try {
    const res = await api.patch(ENDPOINTS.ADMIN.TOGGLE_COLOR_PALETTE(id!), {}, {
      authRole: ROLE_VALUES.lower.ADMIN,
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
