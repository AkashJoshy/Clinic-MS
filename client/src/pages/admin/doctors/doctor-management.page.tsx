import { Filter, Search, Stethoscope } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { AllApprovals } from "@/components/shared/admin/all-approvals.shared";
import { AllDoctorCard } from "@/components/shared/admin/all-doctor-card.shared";
import { PendingApproval } from "@/components/shared/admin/pending-approval.shared";
import { RejectedApprovals } from "@/components/shared/admin/rejected-approvals.shared";
import { PendingDoctorCard } from "@/components/shared/admin/doctors/pending-card.shared";
import { RejectedDoctorCard } from "@/components/shared/admin/doctors/rejected-card.shared";
import { DoctorFilterModal } from "@/components/shared/admin/doctors/filter-modal.shared";
import { AllDoctorCardSkeleton } from "@/components/shared/skeletons/all-doctor-card.skeleton";
import DocumentPreviewModal from "@/components/shared/admin/doctors/document-preview-modal.shared";
import { Pagination } from "@/components/layout/pagination.layout";
import { RejectModal } from "@/components/layout/reject-modal.layout";
import AdminPageHeader from "@/components/shared/page-header.shared";
import { useAuthStore } from "@/store";

import type { DoctorRejectDto } from "@/types/doctor";
import { useDoctorManagement } from "@/hooks/use-doctor-management.hook";
import { getDoctorManagementTheme } from "@/helpers/admin/doctors.helper";

const ITEMS_PER_PAGE = 6;

const cardContainerVariants = {
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
};

const cardVariants: Variants = {
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
};

export default function DoctorManagementPage() {
  const { admin } = useAuthStore((state) => state.users);
  const isDark = admin?.theme === "DARK";

  const {
    departments,
    approvedDoctors,
    pendingDoctors,
    rejectedDoctors,
    isLoading,
    activeTab,
    setActiveTab,
    doctorTabsWithCount,
    searchQuery,
    handleSearchChange,
    filters,
    handleApplyFilters,
    isFilterOpen,
    setIsFilterOpen,
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
    handleApprove,
    rejectTarget,
    setRejectTarget,
    rejectHandler,
    previewImage,
    setPreviewImage,
  } = useDoctorManagement();

  const theme = getDoctorManagementTheme(isDark);

  return (
    <div
      className={`relative min-h-full space-y-6 border p-6 shadow-2xs transition-colors duration-200 lg:p-8 ${theme.container}`}
    >
      {/* Header and Search */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <AdminPageHeader
          icon={Stethoscope}
          title="Doctor Management"
          description="Monitor and manage all registered doctors"
          isDark={isDark}
        />

        <div className="group relative w-full lg:max-w-md">
          <Search
            size={18}
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${theme.searchIcon}`}
          />

          <input
            type="text"
            placeholder="Search by doctor name or clinic..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 ${theme.searchInput}`}
          />
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div
          className={`scrollbar-none custom-scrollbar ${
            isDark ? "scrollbar-dark" : "scrollbar-light"
          } flex items-center gap-1 overflow-x-auto rounded-xl border p-1.5 shadow-inner ${theme.tabsContainer}`}
        >
          {doctorTabsWithCount.map((tab) => {
            const isActive = activeTab === tab.key;

            const countBadge = isActive
              ? "bg-white/20 text-white"
              : tab.key === "pending" && tab.count > 0
                ? theme.pendingBadge
                : tab.key === "rejected" && tab.count > 0
                  ? theme.rejectedBadge
                  : tab.key === "all" && tab.count > 0
                    ? theme.approvedBadge
                    : theme.neutralBadge;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`${theme.tabBase} ${
                  isActive ? theme.tabActive : theme.tabInactive
                }`}
              >
                {tab.label}

                <span className={`${theme.badgeBase} ${countBadge}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
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

      {/* Filter Modal */}
      <DoctorFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        departments={departments}
        onApplyFilters={handleApplyFilters}
        role="admin"
        isDark={isDark}
      />

      {/* All Doctors */}
      {activeTab === "all" && (
        <>
          {isLoading ? (
            <div className={theme.grid}>
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <AllDoctorCardSkeleton key={index} isDark={isDark} />
              ))}
            </div>
          ) : paginatedAll.length === 0 ? (
            <AllApprovals icon={Stethoscope} name="Doctors" isDark={isDark} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={allPage}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardContainerVariants}
              >
                <div className={theme.grid}>
                  {paginatedAll.map((det) => (
                    <motion.div key={det.doctor?.id} variants={cardVariants}>
                      <AllDoctorCard doctorInfo={det} isDark={isDark} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {allTotalPages >= 1 && !isLoading && (
            <Pagination
              currentPage={allPage}
              totalPages={allTotalPages}
              totalItems={approvedDoctors.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setAllPage}
              isDark={isDark}
            />
          )}
        </>
      )}

      {/* Pending Doctors */}
      {activeTab === "pending" && (
        <>
          {isLoading ? (
            <div className={theme.grid}>
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <AllDoctorCardSkeleton key={index} isDark={isDark} />
              ))}
            </div>
          ) : pendingDoctors.length === 0 ? (
            <PendingApproval name="Doctor" isDark={isDark} />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={pendingPage}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardContainerVariants}
                >
                  <div className={theme.grid}>
                    {paginatedPending.map((det) => (
                      <motion.div key={det.doctor?.id} variants={cardVariants}>
                        <PendingDoctorCard
                          doctorInfo={det}
                          onApprove={handleApprove}
                          onReject={(doctor) => setRejectTarget(doctor)}
                          setPreviewImage={setPreviewImage}
                          isDark={isDark}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {pendingTotalPages >= 1 && (
                <Pagination
                  currentPage={pendingPage}
                  totalPages={pendingTotalPages}
                  totalItems={pendingDoctors.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setPendingPage}
                  isDark={isDark}
                />
              )}
            </>
          )}
        </>
      )}

      {/* Rejected Doctors */}
      {activeTab === "rejected" && (
        <>
          {isLoading ? (
            <div className={theme.grid}>
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <AllDoctorCardSkeleton key={index} isDark={isDark} />
              ))}
            </div>
          ) : rejectedDoctors.length === 0 ? (
            <RejectedApprovals isDark={isDark} />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={rejectedPage}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardContainerVariants}
                >
                  <div className={theme.grid}>
                    {paginatedRejected.map((det) => (
                      <motion.div key={det.doctor?.id} variants={cardVariants}>
                        <RejectedDoctorCard
                          doctorInfo={det}
                          setPreviewImage={setPreviewImage}
                          isDark={isDark}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {rejectedTotalPages >= 1 && (
                <Pagination
                  currentPage={rejectedPage}
                  totalPages={rejectedTotalPages}
                  totalItems={rejectedDoctors.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setRejectedPage}
                  isDark={isDark}
                />
              )}
            </>
          )}
        </>
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <RejectModal<DoctorRejectDto>
          id={rejectTarget.doctor.id!}
          name={rejectTarget.doctor.displayName}
          onConfirm={() => rejectHandler}
          onClose={() => setRejectTarget(null)}
          mutateFn={rejectHandler}
          isDark={isDark}
        />
      )}

      {/* Document Preview */}
      <DocumentPreviewModal
        onClose={() => setPreviewImage(null)}
        previewImage={previewImage}
        isDark={isDark}
      />
    </div>
  );
}
