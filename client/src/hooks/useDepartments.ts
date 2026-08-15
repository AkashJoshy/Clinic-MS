import { getAllDepartments } from "@/services/common.service";
import type { DepartmentData } from "@/types/admin";
import { useEffect, useState } from "react";

export const useDepartments = () => {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [activeDepartments, setActiveDepartments] = useState<DepartmentData[]>(
    [],
  );
  const [inactiveDepartments, setInactiveDepartments] = useState<
    DepartmentData[]
  >([]);

  const fetchDepartments = async () => {
    let response: { data: DepartmentData[] } = await getAllDepartments();
    const activeData = response.data.filter((dept) => dept.status === "ACTIVE");
    const inactiveData = response.data.filter(
      (dept) => dept.status === "INACTIVE",
    );
    const allData = response.data;

    setDepartments(allData);
    setActiveDepartments(activeData);
    setInactiveDepartments(inactiveData);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    activeDepartments,
    inactiveDepartments,
  };
};
