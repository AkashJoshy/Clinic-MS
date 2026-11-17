import { useEffect, useState } from "react";
import { Filter, Search, Stethoscope } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import toast from "react-hot-toast";

import {
  approveDoctor,
  getAllDoctors,
  rejectDoctor,
} from "@/services/admin.service";
import { getAllDepartments } from "@/services/shared.service";

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

import { useMutate } from "@/hooks/use-mutate.hook";

import type {
  DoctorDetailsCardInfo,
  DoctorRejectDto,
  DoctorStatusUpdateDto,
} from "@/types/doctor";
import type { DepartmentData, DoctorManagementTab } from "@/types/admin";

import { defaultDoctorFilters, DOCTOR_TABS } from "@/constants/admin.constant";
import { useAuthStore } from "@/store";
import type { DoctorFilterState } from "@/types/admin/doctor.types";

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

  const [activeTab, setActiveTab] = useState<DoctorManagementTab>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const theme = {
    container: isDark
      ? "border-white/10 bg-white/[0.02] text-white"
      : "border-gray-200 bg-gray-50 text-gray-900",

    searchIcon: "text-[#4a5568] group-focus-within:text-primary",

    searchInput: isDark
      ? "border-white/8 bg-[#0d1a27] text-white placeholder:text-[#4a5568]"
      : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400",

    totalText: isDark ? "text-[#8b9ab0]" : "text-gray-500",

    countBadge: isDark
      ? "bg-gray-800 text-primary"
      : "bg-green-50 text-[#1dc465]",

    tabsContainer: isDark
      ? "border-white/10 bg-[#0d1a27]"
      : "border-gray-200 bg-white",

    tabBase:
      "flex items-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-bold transition-all duration-200 ",

    tabActive: "bg-primary text-white shadow-lg shadow-primary/20",

    tabInactive: isDark
      ? "text-[#8b9ab0] hover:text-white hover:bg-white/5"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",

    filterButton: isDark
      ? "border-white/8 bg-[#0d1a27] text-[#8b9ab0] hover:text-white hover:bg-primary/5"
      : "border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-primary-50",

    filterHover: "hover:border-primary/50",

    grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",

    badgeBase: "rounded-md px-2 py-0.5 text-[11px] font-bold",

    pendingBadge: isDark
      ? "bg-amber-500/20 text-amber-400"
      : "bg-amber-100 text-amber-700",

    rejectedBadge: isDark
      ? "bg-red-500/20 text-red-400"
      : "bg-red-100 text-red-700",

    approvedBadge: isDark
      ? "bg-[#1dc465] text-[#0d1a27]"
      : "bg-emerald-100 text-emerald-700",

    neutralBadge: isDark
      ? "bg-white/8 text-[#8b9ab0]"
      : "bg-gray-100 text-gray-500",
  };

  // Fetch doctors
  const fetchDoctors = async () => {
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
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();

      setDepartments(
        response.data ? [{ id: "1", name: "ALL" }, ...response.data] : [],
      );
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch departments");
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  // Search and filter doctors
  const filteredDoctors = doctorDetails.filter((det) => {
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
  filteredDoctors.sort((a, b) => {
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

  const approvedDoctors = filteredDoctors.filter(
    (det) => det.doctor?.status === "APPROVED",
  );

  const pendingDoctors = filteredDoctors.filter(
    (det) => det.doctor?.status === "PENDING",
  );

  const rejectedDoctors = filteredDoctors.filter(
    (det) => det.doctor?.status === "REJECTED",
  );

  // Pagination
  const allTotalPages = Math.ceil(approvedDoctors.length / ITEMS_PER_PAGE);
  const pendingTotalPages = Math.ceil(pendingDoctors.length / ITEMS_PER_PAGE);
  const rejectedTotalPages = Math.ceil(rejectedDoctors.length / ITEMS_PER_PAGE);

  const paginatedAll = approvedDoctors.slice(
    (allPage - 1) * ITEMS_PER_PAGE,
    allPage * ITEMS_PER_PAGE,
  );

  const paginatedPending = pendingDoctors.slice(
    (pendingPage - 1) * ITEMS_PER_PAGE,
    pendingPage * ITEMS_PER_PAGE,
  );

  const paginatedRejected = rejectedDoctors.slice(
    (rejectedPage - 1) * ITEMS_PER_PAGE,
    rejectedPage * ITEMS_PER_PAGE,
  );

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

      setPendingPage((current) =>
        Math.min(
          current,
          Math.max(1, Math.ceil((pendingDoctors.length - 1) / ITEMS_PER_PAGE)),
        ),
      );

      setRejectedPage(
        Math.max(1, Math.ceil((rejectedDoctors.length + 1) / ITEMS_PER_PAGE)),
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

    setPendingPage((current) =>
      Math.min(
        current,
        Math.max(1, Math.ceil((pendingDoctors.length - 1) / ITEMS_PER_PAGE)),
      ),
    );
  };

  // Confirm rejection
  const handleRejectConfirm = () => {
    if (!rejectTarget) return;

    const doctorId = rejectTarget.doctor.id;

    setDoctorDetails((prev) =>
      prev.map((doctor) =>
        doctor.doctor?.id === doctorId
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
  };

  // Tab counts
  const doctorTabsWithCount = DOCTOR_TABS.map((tab) => ({
    ...tab,
    count:
      tab.key === "all"
        ? approvedDoctors.length
        : tab.key === "rejected"
          ? rejectedDoctors.length
          : pendingDoctors.length,
  }));

  // Reset pagination when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setAllPage(1);
    setPendingPage(1);
    setRejectedPage(1);
  };

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
          className={`scrollbar-none custom-scrollbar ${isDark ? 'scrollbar-dark' : 'scrollbar-light'} flex items-center gap-1 overflow-x-auto rounded-xl border p-1.5 shadow-inner ${theme.tabsContainer}`}
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

      <DoctorFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        departments={departments}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          setAllPage(1);
          setPendingPage(1);
          setRejectedPage(1);
        }}
        role="admin"
        isDark={isDark}
      />

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

      {rejectTarget && (
        <RejectModal<DoctorRejectDto>
          id={rejectTarget.doctor.id!}
          name={rejectTarget.doctor.displayName}
          onConfirm={handleRejectConfirm}
          onClose={() => setRejectTarget(null)}
          mutateFn={rejectHandler}
          isDark={isDark}
        />
      )}

      <DocumentPreviewModal
        onClose={() => setPreviewImage(null)}
        previewImage={previewImage}
        isDark={isDark}
      />
    </div>
  );
}
