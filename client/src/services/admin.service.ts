import api from "@/api/interceptors";
import type { DepartmentData, DepartmentDto } from "@/types/admin";
import type {
  DoctorStatusUpdateDto,
  UpdateDoctorStatusDto,
} from "@/types/doctor";
import { ENDPOINTS } from "./endpoints";
import type { DeletePatientDto } from "@/types/patient";
import type { UpdateMethods } from "@/types/common";

export const addDepartment = async (data: Omit<DepartmentData, "id">) => {
  try {
    const res = await api.post(ENDPOINTS.ADMIN.ADD_DEPARTMENT, data);
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
    const res = await api.patch(ENDPOINTS.ADMIN.DEPARTMENT(data.id), {
      status: data.status,
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

export const getDepartment = async (deptId: string) => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.DEPARTMENT(deptId));
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
    const res = await api.put(ENDPOINTS.ADMIN.DEPARTMENT(id!), data);
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
    const res = await api.get(ENDPOINTS.ADMIN.DOCTORS);
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
    const res = await api.patch(ENDPOINTS.ADMIN.APPROVE_DOCTOR(id), {
      reviewMessage,
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

export const rejectDoctor = async (data: DoctorStatusUpdateDto) => {
  try {
    const { id, reviewMessage } = data;
    const res = await api.delete(ENDPOINTS.ADMIN.REJECT_DOCTOR(id), {
      data: {
        reviewMessage,
      },
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
    const res = await api.get(ENDPOINTS.ADMIN.DOCTOR(doctorId));
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
    const res = await api.patch(ENDPOINTS.ADMIN.UPDATE_DOCTOR(id), { method });
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
    const res = await api.get(ENDPOINTS.ADMIN.PATIENTS);
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
    const res = await api.get(ENDPOINTS.ADMIN.PATIENT(patientId));
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
    const res = await api.patch(ENDPOINTS.ADMIN.PATIENT(id), { method });
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
