import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  approveDoctor,
  getAllDoctors,
  rejectDoctor,
} from "@/services/admin.service";
import { getAllDepartments } from "@/services/shared.service";
import { useMutate } from "@/hooks/use-mutate.hook";
import type {
  DoctorDetailsCardInfo,
  DoctorRejectDto,
  DoctorStatusUpdateDto,
  GetAllDoctorsQueryParams,
} from "@/types/doctor";
import type { DepartmentData, DoctorManagementTab } from "@/types/admin";
import { defaultDoctorFilters, DOCTOR_TABS } from "@/constants/admin.constant";
import type { DoctorFilterState } from "@/types/admin/doctor.types";
import type { PaginatedData } from "@/types/common";
import type { Gender } from "@/types/patient";

const ITEMS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 400;

const emptyPaginated: PaginatedData<DoctorDetailsCardInfo> = {
  data: [],
  hasNextPage: false,
  hasPreviousPage: false,
  limit: ITEMS_PER_PAGE,
  page: 1,
  total: 0,
  totalPages: 0,
};

export const useDoctorManagement = () => {
  // States
  const [activeTab, setActiveTab] = useState<DoctorManagementTab>("all");
  const [isLoading, setIsLoading] = useState(false);

  const [approved, setApproved] = useState(emptyPaginated);
  const [pending, setPending] = useState(emptyPaginated);
  const [rejected, setRejected] = useState(emptyPaginated);

  const [rejectTarget, setRejectTarget] =
    useState<DoctorDetailsCardInfo | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [filters, setFilters] =
    useState<DoctorFilterState>(defaultDoctorFilters);

  const [allPage, setAllPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);

  // Debounce search so we don't hit the API on every keystroke
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedSearch(searchQuery.trim()),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(t);
  }, [searchQuery]);

  const queryParams = useMemo<GetAllDoctorsQueryParams>(
    () => ({
      search: debouncedSearch || undefined,
      gender:
        filters.gender !== "ALL"
          ? (filters.gender.toUpperCase() as Gender)
          : undefined,
      departmentIds:
        filters.department.length < 1
          ? undefined
          : filters.department.filter((d) => d.name !== "ALL").map((d) => d.id),
      sortBy: filters.sortBy,
      limit: ITEMS_PER_PAGE,
      approvedPage: allPage,
      pendingPage,
      rejectedPage,
    }),
    [debouncedSearch, filters, allPage, pendingPage, rejectedPage],
  );

  // Fetch doctors
  const fetchDoctors = useCallback(async () => {
    try {
      setIsLoading(true);

      // console.log(queryParams);
      console.log(filters.department);
      const response = await getAllDoctors(queryParams);

      setApproved(response.data.approved ?? emptyPaginated);
      setPending(response.data.pending ?? emptyPaginated);
      setRejected(response.data.rejected ?? emptyPaginated);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch doctors");
      setApproved(emptyPaginated);
      setPending(emptyPaginated);
      setRejected(emptyPaginated);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  // Fetch departments
  const fetchDepartments = useCallback(async () => {
    try {
      const response = await getAllDepartments();

      setDepartments(
        response.data ? [{ id: "1", name: "ALL" }, ...response.data] : [],
      );
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch departments");
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // Refetches whenever search / filters / any page changes
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Mutations (refetch after success so lists, counts and pages stay correct)
  const { mutate } = useMutate(approveDoctor, {
    onSuccess: () => {
      fetchDoctors();
    },
  });

  const { mutate: rejectHandler } = useMutate(rejectDoctor, {
    onSuccess: () => {
      setRejectTarget(null);
      fetchDoctors();
    },
  });

  // Approve doctor
  const handleApprove = (data: DoctorStatusUpdateDto) => {
    mutate(data);
  };

  // Confirm rejection
  const handleRejectConfirm = (data: DoctorRejectDto) => {
    if (!rejectTarget) return;

    rejectHandler(data);
  };

  // Tab counts (straight from server totals)
  const doctorTabsWithCount = useMemo(
    () =>
      DOCTOR_TABS.map((tab) => ({
        ...tab,
        count:
          tab.key === "all"
            ? approved.total
            : tab.key === "rejected"
              ? rejected.total
              : pending.total,
      })),
    [approved.total, pending.total, rejected.total],
  );

  // Search handler
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setAllPage(1);
    setPendingPage(1);
    setRejectedPage(1);
  };

  // Filter handler
  const handleApplyFilters = (newFilters: DoctorFilterState) => {
    setFilters(newFilters);
    setAllPage(1);
    setPendingPage(1);
    setRejectedPage(1);
  };

  return {
    departments,
    approvedDoctors: approved.data,
    pendingDoctors: pending.data,
    rejectedDoctors: rejected.data,
    isLoading,
    activeTab,
    setActiveTab,
    doctorTabsWithCount,
    searchQuery,
    handleSearchChange,
    filters,
    setFilters,
    handleApplyFilters,
    isFilterOpen,
    setIsFilterOpen,
    allPage,
    setAllPage,
    pendingPage,
    setPendingPage,
    rejectedPage,
    setRejectedPage,
    allTotalPages: approved.totalPages,
    pendingTotalPages: pending.totalPages,
    rejectedTotalPages: rejected.totalPages,
    paginatedAll: approved.data,
    paginatedPending: pending.data,
    paginatedRejected: rejected.data,
    handleApprove,
    rejectTarget,
    setRejectTarget,
    handleRejectConfirm,
    rejectHandler,
    previewImage,
    setPreviewImage,
  };
};
