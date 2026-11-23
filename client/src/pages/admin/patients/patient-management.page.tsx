
import { useEffect, useState } from "react";
import { Users, Filter, Search } from "lucide-react";
import toast from "react-hot-toast";
import { AllApprovals } from "@/components/shared/admin/all-approvals.shared";
import { Pagination } from "@/components/layout/pagination.layout";
import { getAllPatients } from "@/services/admin.service";
import type { PatientBasicInfo } from "@/types/patient";
import { PatientListItem } from "@/components/shared/patient-list-item.shared";
import {
  defaultPatientFilters,
  PatientFilterModal,
  type PatientFilterState,
} from "@/components/shared/admin/patients/patient-filter-modal";
import { PatientListItemSkeleton } from "@/components/shared/skeletons/patient-list-item.skeleton";
import { AnimatePresence, motion } from "framer-motion";
import AdminPageHeader from "@/components/shared/page-header.shared";
import { useAuthStore } from "@/store";
import { getPatientManagementTheme } from "@/helpers/admin/patients.helper";

const ITEMS_PER_PAGE = 6;

export default function PatientManagementPage() {
  const { admin } = useAuthStore((state) => state.users);
  const isDark = admin?.theme === "DARK";

  const [patientDetails, setPatientDetails] = useState<PatientBasicInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<PatientFilterState>(
    defaultPatientFilters,
  );
  const [page, setPage] = useState<number>(1);

  const theme = getPatientManagementTheme(isDark)

  const fetchPatients = async () => {
    try {
      setIsLoading(true);

      const getPatients = await getAllPatients();
      const data = getPatients.data;

      setPatientDetails(data ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch patients.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patientDetails.filter((det) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();

      const match =
        det.patient.displayName.toLowerCase().includes(q) ||
        det.user?.email?.toLowerCase().includes(q);

      if (!match) return false;
    }

    if (
      filters.gender !== "ALL" &&
      det.patient.gender !== filters.gender.toUpperCase()
    ) {
      return false;
    }

    const activeStatus = det.user
      ? det.user.isActive === true
        ? "ACTIVE"
        : "INACTIVE"
      : "INACTIVE";

    if (filters.status !== "ALL" && filters.status !== activeStatus) {
      return false;
    }

    return true;
  });

  filteredPatients.sort((a, b) => {
    if (filters.sortBy === "NEWEST") {
      return (
        new Date(b.patient?.createdAt || 0).getTime() -
        new Date(a.patient?.createdAt || 0).getTime()
      );
    } else if (filters.sortBy === "OLDEST") {
      return (
        new Date(a.patient?.createdAt || 0).getTime() -
        new Date(b.patient?.createdAt || 0).getTime()
      );
    } else if (filters.sortBy === "NAME_ASC") {
      return a.patient?.displayName.localeCompare(b.patient?.displayName);
    } else if (filters.sortBy === "NAME_DESC") {
      return b.patient?.displayName.localeCompare(a.patient?.displayName);
    }

    return 0;
  });

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);

  const paginatedPatients = filteredPatients.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div
      className={`relative min-h-full space-y-6 border p-6 shadow-2xs lg:p-8 ${theme.container}`}
    >
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <AdminPageHeader
          icon={Users}
          title="Patient Management"
          description="Monitor and manage all registered patients"
          isDark={isDark}
        />

        <div className="group relative w-full lg:max-w-md">
          <Search
            size={18}
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${theme.searchIcon}`}
          />

          <input
            type="text"
            placeholder="Search by Patient name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 ${theme.searchInput}`}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div
          className={`flex items-center gap-2 text-sm font-bold ${theme.totalText}`}
        >
          <span>Total Patients</span>
          <span
            className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${theme.countBadge}`}
          >
            {filteredPatients.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold transition-all md:w-auto ${theme.filterButton} ${theme.filterHover}`}
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      <PatientFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          setPage(1);
        }}
        isDark={isDark}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PatientListItemSkeleton key={i} isDark={admin?.theme === "DARK"} />
          ))}
        </div>
      ) : paginatedPatients.length === 0 ? (
        <AllApprovals icon={Users} name="Patients" isDark={isDark} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
              exit: {
                transition: {
                  staggerChildren: 0.03,
                  staggerDirection: -1,
                },
              },
            }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedPatients.map((det) => (
                <motion.div
                  key={det.patient?.id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: 12,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.25,
                        ease: "easeOut",
                      },
                    },
                    exit: {
                      opacity: 0,
                      x: -8,
                      transition: {
                        duration: 0.15,
                        ease: "easeIn",
                      },
                    },
                  }}
                >
                  <PatientListItem
                    patientInfo={det}
                    setPatientInfo={setPatientDetails}
                    isDark={isDark}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {totalPages >= 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredPatients.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
          isDark={isDark}
        />
      )}
    </div>
  );
}
