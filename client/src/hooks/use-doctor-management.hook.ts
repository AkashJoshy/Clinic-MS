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
} from "@/types/doctor";
import type { DepartmentData, DoctorManagementTab } from "@/types/admin";

import { defaultDoctorFilters, DOCTOR_TABS } from "@/constants/admin.constant";
import type { DoctorFilterState } from "@/types/admin/doctor.types";

const ITEMS_PER_PAGE = 6;

export const useDoctorManagement = () => {
  // States
  const [activeTab, setActiveTab] = useState<DoctorManagementTab>("all");
  const [isLoading, setIsLoading] = useState(false);

  const [doctorDetails, setDoctorDetails] = useState<DoctorDetailsCardInfo[]>(
    [],
  );

  const [rejectTarget, setRejectTarget] =
    useState<DoctorDetailsCardInfo | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [filters, setFilters] =
    useState<DoctorFilterState>(defaultDoctorFilters);

  const [allPage, setAllPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);

  // Fetch doctors
  const fetchDoctors = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await getAllDoctors();
      setDoctorDetails(response.data ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch doctors");
      setDoctorDetails([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    fetchDoctors();
    fetchDepartments();
  }, [fetchDoctors, fetchDepartments]);

  // Search and filter doctors
  const filteredDoctors = useMemo(() => {
    const result = doctorDetails.filter((det) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();

        const matchesSearch =
          det.doctor?.displayName?.toLowerCase().includes(query) ||
          det.doctorClinicDetails?.some((dc) =>
            dc.clinic?.name?.toLowerCase().includes(query),
          );

        if (!matchesSearch) return false;
      }

      if (
        filters.gender !== "ALL" &&
        det.doctor.gender !== filters.gender.toUpperCase()
      ) {
        return false;
      }

      const isAllDepartment = filters.department.some(
        (department) => department.name === "ALL",
      );

      if (
        !isAllDepartment &&
        !filters.department.some(
          (department) => department.id === det.doctor.departmentId,
        )
      ) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "NEWEST":
          return (
            new Date(b.doctor?.createdAt || 0).getTime() -
            new Date(a.doctor?.createdAt || 0).getTime()
          );

        case "OLDEST":
          return (
            new Date(a.doctor?.createdAt || 0).getTime() -
            new Date(b.doctor?.createdAt || 0).getTime()
          );

        case "NAME_ASC":
          return a.doctor?.displayName.localeCompare(b.doctor?.displayName);

        case "NAME_DESC":
          return b.doctor?.displayName.localeCompare(a.doctor?.displayName);

        default:
          return 0;
      }
    });

    return result;
  }, [doctorDetails, searchQuery, filters]);

  // Status-based lists
  const approvedDoctors = useMemo(
    () => filteredDoctors.filter((det) => det.doctor?.status === "APPROVED"),
    [filteredDoctors],
  );

  const pendingDoctors = useMemo(
    () => filteredDoctors.filter((det) => det.doctor?.status === "PENDING"),
    [filteredDoctors],
  );

  const rejectedDoctors = useMemo(
    () => filteredDoctors.filter((det) => det.doctor?.status === "REJECTED"),
    [filteredDoctors],
  );

  // Pagination calculations
  const allTotalPages = Math.ceil(approvedDoctors.length / ITEMS_PER_PAGE);
  const pendingTotalPages = Math.ceil(pendingDoctors.length / ITEMS_PER_PAGE);
  const rejectedTotalPages = Math.ceil(rejectedDoctors.length / ITEMS_PER_PAGE);

  const paginatedAll = useMemo(
    () =>
      approvedDoctors.slice(
        (allPage - 1) * ITEMS_PER_PAGE,
        allPage * ITEMS_PER_PAGE,
      ),
    [approvedDoctors, allPage],
  );

  const paginatedPending = useMemo(
    () =>
      pendingDoctors.slice(
        (pendingPage - 1) * ITEMS_PER_PAGE,
        pendingPage * ITEMS_PER_PAGE,
      ),
    [pendingDoctors, pendingPage],
  );

  const paginatedRejected = useMemo(
    () =>
      rejectedDoctors.slice(
        (rejectedPage - 1) * ITEMS_PER_PAGE,
        rejectedPage * ITEMS_PER_PAGE,
      ),
    [rejectedDoctors, rejectedPage],
  );

  // Mutations
  const { mutate } = useMutate(approveDoctor);

  const { mutate: rejectHandler } = useMutate(rejectDoctor, {
    onSuccess: () => {
      if (!rejectTarget) return;

      setDoctorDetails((prev) =>
        prev.map((doctor) =>
          doctor.doctor?.id === rejectTarget.doctor.id
            ? {
                ...doctor,
                doctor: {
                  ...doctor.doctor,
                  status: "REJECTED",
                },
              }
            : doctor,
        ),
      );

      setRejectTarget(null);
    },
  });

  // Approve doctor
  const handleApprove = (data: DoctorStatusUpdateDto) => {
    mutate(data);

    setDoctorDetails((prev) =>
      prev.map((doctor) =>
        doctor.doctor?.id === data.id
          ? {
              ...doctor,
              doctor: {
                ...doctor.doctor,
                status: "APPROVED",
              },
            }
          : doctor,
      ),
    );
  };

  // Confirm rejection
  const handleRejectConfirm = (data: DoctorRejectDto) => {
    if (!rejectTarget) return;

    rejectHandler(data);
  };

  // Tab counts
  const doctorTabsWithCount = useMemo(
    () =>
      DOCTOR_TABS.map((tab) => ({
        ...tab,
        count:
          tab.key === "all"
            ? approvedDoctors.length
            : tab.key === "rejected"
              ? rejectedDoctors.length
              : pendingDoctors.length,
      })),
    [approvedDoctors.length, rejectedDoctors.length, pendingDoctors.length],
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
    // Data
    doctorDetails,
    departments,
    approvedDoctors,
    pendingDoctors,
    rejectedDoctors,

    // Loading
    isLoading,

    // Tabs
    activeTab,
    setActiveTab,
    doctorTabsWithCount,

    // Search and filters
    searchQuery,
    handleSearchChange,
    filters,
    setFilters,
    handleApplyFilters,
    isFilterOpen,
    setIsFilterOpen,

    // Pagination
    allPage,
    setAllPage,
    pendingPage,
    setPendingPage,
    rejectedPage,
    setRejectedPage,
    allTotalPages,
    pendingTotalPages,
    rejectedTotalPages,
    paginatedAll,
    paginatedPending,
    paginatedRejected,

    // Actions
    handleApprove,
    rejectTarget,
    setRejectTarget,
    handleRejectConfirm,
    rejectHandler,

    // Document preview
    previewImage,
    setPreviewImage,
  };
};
