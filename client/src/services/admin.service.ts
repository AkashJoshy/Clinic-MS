import api from "@/api/interceptors";
import type { DepartmentData, DepartmentDto } from "@/types/admin";
import type {
  DoctorRejectDto,
  DoctorStatusUpdateDto,
  DocumentDto,
} from "@/types/doctor";
import { ENDPOINTS } from "./endpoints";
import type { DeletePatientDto } from "@/types/patient";
import type { UpdateMethods } from "@/types/common";
import { ROLE_VALUES } from "@/constants/role.constants";

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
    const {
      id,
      ...data
    } = doctorData as DocumentDto   
    const res = await api.patch(ENDPOINTS.ADMIN.VERIFY_DOCTOR_DOCUMENT(id), data, {
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

export const verifyClinicDocument = async (clinicData: DocumentDto) => {
  try {
    const {
      id,
      ...data
    } = clinicData as DocumentDto
    const res = await api.patch(ENDPOINTS.ADMIN.VERIFY_CLINIC_DOCUMENT(id),
      data, {
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

