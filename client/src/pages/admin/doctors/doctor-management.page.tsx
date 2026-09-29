import { useEffect, useState } from "react";
import { Filter, Search, Stethoscope, X } from "lucide-react";
import {
  approveDoctor,
  getAllDoctors,
  rejectDoctor,
} from "@/services/admin.service";
import toast from "react-hot-toast";
import { AllApprovals } from "@/components/shared/admin/all-approvals.shared";
import { Pagination } from "@/components/layout/pagination.layout";
import { RejectModal } from "@/components/layout/reject-modal.layout";
import type {
  AdminDoctorInfo,
  DoctorDetailsCardInfo,
  DoctorInfo,
  DoctorRejectDto,
  DoctorStatusUpdateDto,
} from "@/types/doctor";
import {
  defaultDoctorFilters,
  DoctorFilterModal,
  type DoctorFilterState,
} from "@/components/shared/admin/doctors/filter-modal.shared";
import { AllDoctorCard } from "@/components/shared/admin/all-doctor-card.shared";
import { PendingApproval } from "@/components/shared/admin/pending-approval.shared";
import { PendingDoctorCard } from "@/components/shared/admin/doctors/pending-card.shared";
import type { DepartmentData, DoctorManagementTab } from "@/types/admin";
import { getAllDepartments } from "@/services/common.service";
import { useMutate } from "@/hooks/use-mutate.hook";
import { AllDoctorCardSkeleton } from "@/components/shared/skeletons/all-doctor-card.skeleton";
import { DOCTOR_TABS } from "@/constants/admin.constant";
import { RejectedApprovals } from "@/components/shared/admin/rejected-approvals.shared";
import { RejectedDoctorCard } from "@/components/shared/admin/doctors/rejected-card.shared";
import { AnimatePresence, motion } from "framer-motion";
import AdminPageHeader from "@/components/shared/admin/admin-page-header.shared";
import DocumentPreviewModal from "@/components/shared/admin/doctors/document-preview-modal.shared";

const ITEMS_PER_PAGE = 6;

export default function DoctorManagementPage() {
  const [activeTab, setActiveTab] = useState<DoctorManagementTab>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetailsCardInfo[]>([]);
  const [rejectTarget, setRejectTarget] = useState<DoctorDetailsCardInfo | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [filters, setFilters] =
    useState<DoctorFilterState>(defaultDoctorFilters);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const getDoctors = await getAllDoctors();
      const data = getDoctors.data;
      if (data) {
        console.log(`Data: `)
        console.log(data)
        setDoctorDetails(data);
        setIsLoading(false);
      } else {
        setDoctorDetails([]);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const fetchDepartments = async () => {
    try {
      const getDepartments = await getAllDepartments();
      const data = getDepartments.data;
      if (data) {
        setDepartments([{ id: "1", name: "ALL" }, ...data]);
      } else {
        setDepartments([]);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  const [allPage, setAllPage] = useState<number>(1);
  const [pendingPage, setPendingPage] = useState<number>(1);
  const [rejectedPage, setRejectedPage] = useState<number>(1);

  const filteredDoctors = doctorDetails.filter((det) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();

      const match = det.doctorClinicDetails.filter(dc => dc.clinic?.name.toLowerCase()?.includes(q)) ||
        det.doctor.displayName.toLowerCase().includes(q);

      if (!match) return false;
    }

    if (
      filters.gender !== "ALL" &&
      det.doctor.gender !== filters.gender.toUpperCase()
    ) {
      return false;
    }

    const isAllDepartment = filters.department.some((d) => d.name === "ALL");

    if (
      !isAllDepartment &&
      !filters.department.some((d) => d.id === det.doctor.departmentId)
    ) {
      return false;
    }

    return true;
  });

  filteredDoctors.sort((a, b) => {
    if (filters.sortBy === "NEWEST") {
      return (
        new Date(b.doctor?.createdAt || 0).getTime() -
        new Date(a.doctor?.createdAt || 0).getTime()
      );
    } else if (filters.sortBy === "OLDEST") {
      return (
        new Date(a.doctor?.createdAt || 0).getTime() -
        new Date(b.doctor?.createdAt || 0).getTime()
      );
    } else if (filters.sortBy === "NAME_ASC") {
      return a.doctor?.displayName.localeCompare(b.doctor?.displayName);
    } else if (filters.sortBy === "NAME_DESC") {
      return b.doctor?.displayName.localeCompare(a.doctor?.displayName);
    }
    return 0;
  });

  const rejectedDoctors = filteredDoctors.filter(
    (det) => det.doctor?.status === "REJECTED",
  );
  const pendingDoctors = filteredDoctors.filter(
    (det) => det.doctor?.status === "PENDING",
  );
  const approvedDoctors = filteredDoctors.filter(
    (det) => det.doctor?.status === "APPROVED",
  );

  const allTotalPages = Math.ceil(approvedDoctors.length / ITEMS_PER_PAGE);
  const paginatedAll = approvedDoctors.slice(
    (allPage - 1) * ITEMS_PER_PAGE,
    allPage * ITEMS_PER_PAGE,
  );

  const pendingTotalPages = Math.ceil(pendingDoctors.length / ITEMS_PER_PAGE);
  const paginatedPending = pendingDoctors.slice(
    (pendingPage - 1) * ITEMS_PER_PAGE,
    pendingPage * ITEMS_PER_PAGE,
  );

  const rejectedTotalPages = Math.ceil(rejectedDoctors.length / ITEMS_PER_PAGE);
  const paginatedRejected = rejectedDoctors.slice(
    (rejectedPage - 1) * ITEMS_PER_PAGE,
    rejectedPage * ITEMS_PER_PAGE,
  );

  const { mutate, isPending } = useMutate(approveDoctor);
  const { mutate: rejectHandler, isPending: rejectIsPending } = useMutate(
    rejectDoctor,
    {
      onSuccess: () => {
        setDoctorDetails((prev) =>
          prev.map((c) =>
            c.doctor?.id === rejectTarget?.doctor.id
              ? { ...c, doctor: { ...c.doctor, status: "REJECTED" } }
              : c,
          ),
        );

        const newPendingCount = pendingDoctors.length - 1;
        const newTotalPages = Math.ceil(newPendingCount / ITEMS_PER_PAGE);
        if (pendingPage > newTotalPages && newTotalPages > 0) {
          setPendingPage(newTotalPages);
        }

        const newRejectedCount = rejectedDoctors.length + 1;
        const newRejectedTotalPages = Math.ceil(
          newRejectedCount / ITEMS_PER_PAGE,
        );
        setRejectedPage(newRejectedTotalPages);
        console.log(rejectedDoctors.length);
        console.log(newRejectedCount);
      },
    },
  );

  const handleApprove = (data: DoctorStatusUpdateDto) => {
    mutate(data);
    setDoctorDetails((prev) =>
      prev.map((c) =>
        c.doctor?.id === data.id
          ? { ...c, doctor: { ...c.doctor, status: "APPROVED" } }
          : c,
      ),
    );

    const newPendingCount = pendingDoctors.length - 1;
    const newTotalPages = Math.ceil(newPendingCount / ITEMS_PER_PAGE);
    if (pendingPage > newTotalPages && newTotalPages > 0) {
      setPendingPage(newTotalPages);
    }
  };

  const handleRejectConfirm = () => {
    if (!rejectTarget) return;

    const doctorId = rejectTarget.doctor.id;

    setDoctorDetails((prev) =>
      prev.map((c) =>
        c.doctor?.id === doctorId
          ? {
              ...c,
              doctor: {
                ...c.doctor,
                status: "REJECTED",
              },
            }
          : c,
      ),
    );

    setRejectTarget(null);
  };

  const doctorTabsWithCount = DOCTOR_TABS.map((tab) => {
    return {
      ...tab,
      count:
        tab.key === "all"
          ? approvedDoctors.length
          : tab.key === "rejected"
            ? rejectedDoctors.length
            : pendingDoctors.length,
    };
  });

  return (
    <div className="min-h-full p-6 lg:p-8 space-y-6 relative border border-white/10 bg-white/2 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 ">
        <AdminPageHeader
          icon={Stethoscope}
          title="Patient Management"
          description="Monitor and manage all registered patients"
        />

        <div className="relative group w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5568] group-focus-within:text-[#1dc465] transition-colors"
          />
          <input
            type="text"
            placeholder="Search by Doctor name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full bg-[#0d1a27] border border-white/8 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:border-[#1dc465]/50 focus:ring-1 focus:ring-[#1dc465]/20 outline-none transition-all placeholder:text-[#4a5568] shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-[#0d1a27] border border-white/8 rounded-xl p-1.5 shadow-inner overflow-x-auto no-scrollbar scroll-smooth">
          {doctorTabsWithCount.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-[#1dc465] text-white shadow-lg shadow-[#1dc465]/20"
                  : "text-[#8b9ab0] hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  activeTab === tab.key
                    ? "bg-white/20 text-white"
                    : tab.key === "pending" && tab.count > 0
                      ? "bg-amber-500/20 text-amber-400"
                      : tab.key === "rejected" && tab.count > 0
                        ? "bg-red-500/20 text-red-400"
                        : tab.key === "all" && tab.count > 0
                          ? "bg-primary text-primary-900"
                          : "bg-white/8 text-[#8b9ab0]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex cursor-pointer items-center justify-center gap-2 px-6 py-3 bg-[#0d1a27] border border-white/8 rounded-xl text-[#8b9ab0] text-sm font-bold hover:text-white hover:border-[#1dc465]/50 hover:bg-[#1dc465]/5 transition-all w-full md:w-auto"
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
        }}
      />

      {activeTab === "all" && (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <AllDoctorCardSkeleton key={index} />
              ))}
            </div>
          ) : paginatedAll.length === 0 ? (
            <AllApprovals icon={Stethoscope} name="Doctors" />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={allPage}
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
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {paginatedAll.map((det) => (
                    <motion.div
                      key={det.doctor?.id}
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
                      <AllDoctorCard key={det.doctor?.id} doctorInfo={det} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {allTotalPages >= 1 && (
            <Pagination
              currentPage={allPage}
              totalPages={allTotalPages}
              totalItems={approvedDoctors.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setAllPage}
              colorCode="WHITE"
            />
          )}
        </>
      )}

      {activeTab === "pending" && (
        <>
          {pendingDoctors.length === 0 ? (
            <PendingApproval name={"Doctor"} />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={allPage}
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
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {paginatedPending.map((det) => (
                      <motion.div
                        key={det.doctor?.id}
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
                        <PendingDoctorCard
                          key={det.doctor.id}
                          doctorInfo={det}
                          onApprove={handleApprove}
                          onReject={(c) => setRejectTarget(c)}
                          setPreviewImage={setPreviewImage}
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
                  colorCode="WHITE"
                />
              )}
            </>
          )}
        </>
      )}

      {activeTab === "rejected" && (
        <>
          {rejectedDoctors.length === 0 ? (
            <RejectedApprovals />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={allPage}
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
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {paginatedRejected.map((det) => (
                      <motion.div
                        key={det.doctor?.id}
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
                        <RejectedDoctorCard
                          key={det.doctor.id}
                          doctorInfo={det}
                          setPreviewImage={setPreviewImage}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {rejectedTotalPages >= 1 && (
                <Pagination
                  currentPage={pendingPage}
                  totalPages={pendingTotalPages}
                  totalItems={pendingDoctors.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setRejectedPage}
                  colorCode="WHITE"
                />
              )}
            </>
          )}
        </>
      )}

      {rejectTarget && (
        <RejectModal<DoctorRejectDto>
          id={rejectTarget.doctor?.id!}
          name={rejectTarget.doctor.displayName}
          onConfirm={handleRejectConfirm}
          onClose={() => setRejectTarget(null)}
          mutateFn={rejectHandler}
        />
      )}

      <DocumentPreviewModal
        onClose={() => setPreviewImage(null)}
        previewImage={previewImage}
      />
    </div>
  );
}
