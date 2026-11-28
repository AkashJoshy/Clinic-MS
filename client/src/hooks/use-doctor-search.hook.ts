import type { AvailabilityType } from "@/mocks/mock-doctors.mock";
import { fetchDoctors } from "@/services/patient.service";
import type { PaginatedData } from "@/types/common";
import type {
  GetPatientDoctorsQueryParams,
  PatientDoctorDetailsCard,
} from "@/types/patient";
import { useState, useMemo, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export interface FilterState {
  specializations: string[];
  availability: AvailabilityType[];
  consultationModes: string[];
  gender: "any" | "male" | "female";
  experience: string;
  rating: string;
}

export interface SortState {
  value: "relevance" | "rating" | "experience" | "fee";
}

const ITEMS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 400;

const initialFilters: FilterState = {
  specializations: [],
  availability: [],
  consultationModes: [],
  gender: "any",
  experience: "",
  rating: "",
};

const emptyPaginated: PaginatedData<PatientDoctorDetailsCard> = {
  data: [],
  hasNextPage: false,
  hasPreviousPage: false,
  limit: ITEMS_PER_PAGE,
  page: 1,
  total: 0,
  totalPages: 0,
};

export function useDoctorSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [doctorsData, setDoctorsData] =
    useState<PaginatedData<PatientDoctorDetailsCard>>(emptyPaginated);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortState>({ value: "relevance" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const queryParams = useMemo<GetPatientDoctorsQueryParams>(() => {
    return {
      search: debouncedSearch || undefined,
      gender: filters.gender !== "any" ? filters.gender : undefined,
      specializations:
        filters.specializations.length > 0
          ? filters.specializations
          : undefined,
      consultationModes:
        filters.consultationModes.length > 0
          ? filters.consultationModes
          : undefined,
      experience: filters.experience || undefined,
      rating: filters.rating || undefined,
      sort: sort.value,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    };
  }, [debouncedSearch, filters, sort, currentPage]);

  const fetchDoctorList = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetchDoctors(queryParams);
      if (res.data) {
        setDoctorsData(res.data);
      } else {
        setDoctorsData(emptyPaginated);
      }
    } catch (error: any) {
      toast.error(error?.message || "Error while fetching doctors");
      setDoctorsData(emptyPaginated);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchDoctorList();
  }, [fetchDoctorList]);

  const totalPages = Math.max(
    1,
    doctorsData.totalPages || Math.ceil(doctorsData.total / ITEMS_PER_PAGE),
  );

  const paginatedDoctors = doctorsData.data ?? [];
  const filteredDoctors = paginatedDoctors;

  function handleSearchChange(q: string) {
    setSearchQuery(q);
    setCurrentPage(1);
  }

  function handleFilterChange(newFilters: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setFilters(initialFilters);
    setCurrentPage(1);
  }

  function handleSortChange(value: SortState["value"]) {
    setSort({ value });
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function simulateLoading() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  }

  const hasActiveFilters =
    filters.specializations.length > 0 ||
    filters.availability.length > 0 ||
    filters.consultationModes.length > 0 ||
    filters.gender !== "any" ||
    filters.experience !== "" ||
    filters.rating !== "";

  return {
    searchQuery,
    filters,
    sort,
    currentPage,
    totalPages,
    totalDoctors: doctorsData.total,
    filteredDoctors,
    paginatedDoctors,
    isLoading,
    hasActiveFilters,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    handleSortChange,
    handlePageChange,
    simulateLoading,
  };
}
