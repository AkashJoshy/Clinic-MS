import {
  MOCK_DOCTORS,
  type AvailabilityType,
  type ConsultationMode,
} from "@/mocks/mockDoctors";
import { fetchDoctors } from "@/services/patient.service";
import type { PatientDoctorDetailsCard } from "@/types/patient";
import { useState, useMemo, useEffect } from "react";
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

const initialFilters: FilterState = {
  specializations: [],
  availability: [],
  consultationModes: [],
  gender: "any",
  experience: "",
  rating: "",
};

export function useDoctorSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<PatientDoctorDetailsCard[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortState>({ value: "relevance" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const res = await fetchDoctors();
        if (res.data) {
          setDoctors(res.data);
        }
      } catch (error) {
        toast.error("Error While fetching doctors");
      }
    };

    fetchAllDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    let docs = [...doctors];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.doctor?.displayName.toLowerCase().includes(q) ||
          d.department?.name.toLowerCase().includes(q),
      );
    }

    if (filters.specializations.length > 0) {
      docs = docs.filter((d) => {
        if (d.department?.name) {
          return filters.specializations.includes(
            d.department?.name[0].toUpperCase() + d.department?.name.slice(1),
          );
        }
      });
    }

    // Availability
    // if (filters.availability.length > 0) {
    //   docs = docs.filter((d) => filters.availability.includes(d.availability));
    // }

    if (filters.consultationModes.length > 0) {
      docs = docs.filter((doctor) =>
        filters.consultationModes.some((mode) =>
          doctor.doctorClinicDetails.some(
            (clinic) => clinic.type === mode.toUpperCase(),
          ),
        ),
      );
    }

    if (filters.gender !== "any") {
      docs = docs.filter(
        (d) => d.doctor.gender.toLowerCase() === filters.gender,
      );
    }

    if (filters.experience) {
      docs = docs.filter((d) => {
        if (filters.experience === "0-5") return d.doctor.experienceYears <= 5;
        if (filters.experience === "5-10")
          return d.doctor.experienceYears > 5 && d.doctor.experienceYears <= 10;
        if (filters.experience === "10+") return d.doctor.experienceYears > 10;
        return true;
      });
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      docs = docs.filter((d) => d.doctor.averageRating >= minRating);
    }

    switch (sort.value) {
      case "rating":
        docs.sort((a, b) => b.doctor.averageRating - a.doctor.averageRating);
        break;
      case "experience":
        docs.sort(
          (a, b) => b.doctor.experienceYears - a.doctor.experienceYears,
        );
        break;
      // case "fee":
      //   docs.sort((a, b) => a.consultationFee - b.consultationFee);
      //   break;
      default:
        break;
    }

    return docs;
  }, [searchQuery, filters, sort, doctors]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE),
  );

  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDoctors.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDoctors, currentPage]);

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
