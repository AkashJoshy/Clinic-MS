import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getAllDepartments, updateDepartment } from "@/services/admin.service";
import { useMutate } from "@/hooks/use-mutate.hook";
import type {
  DepartmentData,
  GetAllDepartmentsQueryParams,
  SelectedDept,
} from "@/types/admin";
import type { PaginatedData, UpdateMethods } from "@/types/common";

const ITEMS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 400;

const emptyPaginated: PaginatedData<DepartmentData> = {
  data: [],
  hasNextPage: false,
  hasPreviousPage: false,
  limit: ITEMS_PER_PAGE,
  page: 1,
  total: 0,
  totalPages: 0,
};

export const useDepartmentManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] =
    useState<PaginatedData<DepartmentData>>(emptyPaginated);
  const [departmentList, setDepartmentList] = useState<DepartmentData[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<
    (SelectedDept & { action: UpdateMethods }) | null
  >(null);
  const [page, setPage] = useState(1);

  // Debounce search so we don't hit the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const queryParams = useMemo<GetAllDepartmentsQueryParams>(
    () => ({
      search: debouncedSearch || undefined,
      limit: ITEMS_PER_PAGE,
      page,
    }),
    [debouncedSearch, page],
  );

  const fetchDepartments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllDepartments(queryParams);
      const paginatedData: PaginatedData<DepartmentData> =
        response.data ?? emptyPaginated;

      setDepartments(paginatedData);
      setDepartmentList(paginatedData.data ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Error fetching departments");
      setDepartments(emptyPaginated);
      setDepartmentList([]);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const { mutate } = useMutate(updateDepartment, {
    onSuccess: (data) => {
      setDepartmentList((prev) =>
        prev.map((dept) => {
          if (dept.id === data.data?.departmentId) {
            return {
              ...dept,
              status: data.data?.status,
            };
          }
          return dept;
        }),
      );
      setOpen(false);
      fetchDepartments();
    },
  });

  const onUpdate = () => {
    if (selectedDept && selectedDept.id) {
      mutate({ id: selectedDept.id, status: selectedDept.status });
    }
  };

  const handleDelete = (data: SelectedDept & { action: UpdateMethods }) => {
    setSelectedDept(data);
    setOpen((prev) => !prev);
  };

  const closeDeleteBox = () => {
    setOpen(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return {
    departmentList,
    isLoading,
    searchQuery,
    handleSearchChange,
    isOpen,
    selectedDept,
    handleDelete,
    closeDeleteBox,
    onUpdate,
    page,
    setPage,
    totalDepartments: departments.total,
    totalPages: departments.totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    fetchDepartments,
  };
};
