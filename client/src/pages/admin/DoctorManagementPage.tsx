import { useEffect, useState } from "react";
import { Filter, Search, Stethoscope, X } from "lucide-react";
import {
  approveDoctor,
  getAllDoctors,
  rejectDoctor,
} from "@/services/admin.service";
import toast from "react-hot-toast";
import { AllApprovals } from "@/components/shared/admin/AllApprovals";
import { Pagination } from "@/components/layout/Pagination";
import { RejectModal } from "@/components/layout/RejectModal";
import type { DoctorInfo, DoctorStatusUpdateDto } from "@/types/doctor";
import {
  defaultDoctorFilters,
  DoctorFilterModal,
  type DoctorFilterState,
} from "@/components/shared/admin/DoctorFilterModal";
import { AllDoctorCard } from "@/components/shared/admin/AllDoctorCard";
import { PendingApproval } from "@/components/shared/admin/PendingApproval";
import { PendingDoctorCard } from "@/components/shared/admin/PendingDoctorCard";
import type { DepartmentData } from "@/types/admin";
import { getAllDepartments } from "@/services/common.service";
import { useMutate } from "@/hooks/useMutate";
import { AllDoctorCardSkeleton } from "@/components/shared/admin/AllDoctorCardSkeleton";

const ITEMS_PER_PAGE = 6;

type Tab = "all" | "pending";

export default function DoctorManagementPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctorDetails, setDoctorDetails] = useState<DoctorInfo[]>([]);
  const [rejectTarget, setRejectTarget] = useState<DoctorInfo | null>(null);
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

  const filteredDoctors = doctorDetails.filter((det) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();

      const match =
        det.clinic.name.toLowerCase().includes(q) ||
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

  const { mutate, isPending } = useMutate(approveDoctor);
  const { mutate: rejectHandler, isPending: rejectIsPending } =
    useMutate(rejectDoctor);

  const handleApprove = (data: DoctorStatusUpdateDto) => {
    mutate(data);
    console.log(`Data from the Approval`);
    console.log(data);
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

  const handleRejectConfirm = (reason: string) => {
    if (!rejectTarget) return;
    console.log(rejectTarget);
    console.log(
      `Rejected Doctor ${rejectTarget.doctor?.displayName}. Reason: ${reason}`,
    );
    setDoctorDetails((prev) =>
      prev.filter((c) => c.doctor?.id !== rejectTarget.doctor?.id),
    );

    const newPendingCount = pendingDoctors.length - 1;
    const newPendingTotalPages = Math.ceil(newPendingCount / ITEMS_PER_PAGE);
    if (pendingPage > newPendingTotalPages && newPendingTotalPages > 0) {
      setPendingPage(newPendingTotalPages);
    }

    const newAllCount = approvedDoctors.length - 1;
    const newAllTotalPages = Math.ceil(newAllCount / ITEMS_PER_PAGE);
    if (allPage > newAllTotalPages && newAllTotalPages > 0) {
      setAllPage(newAllTotalPages);
    }

    setRejectTarget(null);
  };

  return (
    <div className="min-h-full p-6 lg:p-8 space-y-6 relative border border-white/10 bg-white/2 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1dc465]/15 border border-[#1dc465]/25 flex items-center justify-center shrink-0">
            <Stethoscope size={24} className="text-[#1dc465]" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              Doctor Management
            </h1>
            <p className="text-[#8b9ab0] text-sm mt-0.5">
              Monitor and manage all registered doctors
            </p>
          </div>
        </div>

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
          {(
            [
              {
                key: "all",
                label: "All Doctors",
                count: approvedDoctors.length,
              },
              {
                key: "pending",
                label: "Pending Approval",
                count: pendingDoctors.length,
              },
            ] as { key: Tab; label: string; count: number }[]
          ).map((tab) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginatedAll.map((det) => (
                <AllDoctorCard key={det.doctor?.id} doctorInfo={det} />
              ))}
            </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedPending.map((det) => (
                  <PendingDoctorCard
                    key={det.clinic.id}
                    doctorInfo={det}
                    onApprove={handleApprove}
                    onReject={(c) => setRejectTarget(c)}
                    setPreviewImage={setPreviewImage}
                  />
                ))}
              </div>
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

      {rejectTarget && (
        <RejectModal<DoctorStatusUpdateDto>
          id={rejectTarget.doctor?.id!}
          name={rejectTarget.doctor.displayName}
          onConfirm={handleRejectConfirm}
          onClose={() => setRejectTarget(null)}
          mutateFn={rejectHandler}
        />
      )}

      {previewImage && (
        <div
          className="fixed inset-0 bg-[#080d14]/90 backdrop-blur-md flex items-center justify-center z-100 p-4 sm:p-8"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-[#0d1a27] border border-white/8 p-2 rounded-2xl relative max-w-4xl w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#080d14]/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 transition-all z-10"
            >
              <X size={20} />
            </button>
            <div className="overflow-auto max-h-[85vh] rounded-xl bg-[#080d14]/30">
              {previewImage?.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={previewImage}
                  title="Document preview"
                  className="w-full h-full"
                />
              ) : (
                <img
                  src={previewImage ?? undefined}
                  alt="Document preview"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
