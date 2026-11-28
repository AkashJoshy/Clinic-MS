import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getAllPatients } from "@/services/admin.service";
import type { GetAllPatientsQueryParams, PatientBasicInfo } from "@/types/patient";
import {
  defaultPatientFilters,
  type PatientFilterState,
} from "@/components/shared/admin/patients/patient-filter-modal";
import type { PaginatedData } from "@/types/common";
import type { Gender } from "@/types/patient";

const ITEMS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 400;

const emptyPaginated: PaginatedData<PatientBasicInfo> = {
  data: [],
  hasNextPage: false,
  hasPreviousPage: false,
  limit: ITEMS_PER_PAGE,
  page: 1,
  total: 0,
  totalPages: 0,
};

export const usePatientManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState<PaginatedData<PatientBasicInfo>>(emptyPaginated);
  const [patientDetails, setPatientDetails] = useState<PatientBasicInfo[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<PatientFilterState>(defaultPatientFilters);
  const [page, setPage] = useState(1);

  // Debounce search query so API is not spammed on keystrokes
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const queryParams = useMemo<GetAllPatientsQueryParams>(
    () => ({
      search: debouncedSearch || undefined,
      gender:
        filters.gender !== "ALL"
          ? (filters.gender.toUpperCase() as Gender)
          : undefined,
      status:
        filters.status !== "ALL"
          ? (filters.status.toUpperCase() as "ACTIVE" | "INACTIVE")
          : undefined,
      sortBy: filters.sortBy,
      limit: ITEMS_PER_PAGE,
      page,
    }),
    [debouncedSearch, filters, page],
  );

  const fetchPatients = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllPatients(queryParams);
      const paginatedData: PaginatedData<PatientBasicInfo> =
        response.data ?? emptyPaginated;

      setPatients(paginatedData);
      setPatientDetails(paginatedData.data ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch patients.");
      setPatients(emptyPaginated);
      setPatientDetails([]);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleApplyFilters = (newFilters: PatientFilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  return {
    patientDetails,
    setPatientDetails,
    isLoading,
    searchQuery,
    handleSearchChange,
    filters,
    setFilters,
    handleApplyFilters,
    isFilterOpen,
    setIsFilterOpen,
    page,
    setPage,
    totalPatients: patients.total,
    totalPages: patients.totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    fetchPatients,
  };
};
