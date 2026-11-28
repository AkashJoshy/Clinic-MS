import { Users, Filter, Search } from "lucide-react";
import { AllApprovals } from "@/components/shared/admin/all-approvals.shared";
import { Pagination } from "@/components/layout/pagination.layout";
import { PatientListItem } from "@/components/shared/patient-list-item.shared";
import { PatientFilterModal } from "@/components/shared/admin/patients/patient-filter-modal";
import { PatientListItemSkeleton } from "@/components/shared/skeletons/patient-list-item.skeleton";
import { AnimatePresence, motion } from "framer-motion";
import AdminPageHeader from "@/components/shared/page-header.shared";
import { useAuthStore } from "@/store";
import { getPatientManagementTheme } from "@/helpers/admin/patients.helper";
import { usePatientManagement } from "@/hooks/use-patient-management.hook";

export default function PatientManagementPage() {
  const { admin } = useAuthStore((state) => state.users);
  const isDark = admin?.theme === "DARK";

  const {
    patientDetails,
    setPatientDetails,
    isLoading,
    searchQuery,
    handleSearchChange,
    filters,
    handleApplyFilters,
    isFilterOpen,
    setIsFilterOpen,
    page,
    setPage,
    totalPatients,
    totalPages,
    itemsPerPage,
  } = usePatientManagement();

  const theme = getPatientManagementTheme(isDark);

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
            onChange={(e) => handleSearchChange(e.target.value)}
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
            {totalPatients}
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
        onApplyFilters={handleApplyFilters}
        isDark={isDark}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PatientListItemSkeleton key={i} isDark={admin?.theme === "DARK"} />
          ))}
        </div>
      ) : patientDetails.length === 0 ? (
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
              {patientDetails.map((det) => (
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
          totalItems={totalPatients}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          isDark={isDark}
        />
      )}
    </div>
  );
}
