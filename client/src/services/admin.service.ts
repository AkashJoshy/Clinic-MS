import api from "@/api/interceptors";
import type { DepartmentData, DepartmentDto } from "@/types/admin";
import type { UpdateDoctorStatusDto } from "@/types/doctor";
import { ENDPOINTS } from "./endpoints";


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
}

export const updateDepartment = async (data: DepartmentDto) => {
    try {
      const res = await api.patch(ENDPOINTS.ADMIN.DEPARTMENT(data.id), {
        status: data.status
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
}


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
}


export const editDepartment = async (departmentData: DepartmentData) => {
   try {
      const {
        id, ...data
      } = departmentData
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
}