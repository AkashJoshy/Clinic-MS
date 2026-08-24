import { useEffect, useState } from "react";
import { Users, Filter, Search } from "lucide-react";
import toast from "react-hot-toast";
import { AllApprovals } from "@/components/shared/admin/AllApprovals";
import { Pagination } from "@/components/layout/Pagination";
import { getAllPatients } from "@/services/admin.service";
import type { PatientBasicInfo } from "@/types/patient";
import { PatientListItem } from "@/components/shared/PatientListItem";
import {
  defaultPatientFilters,
  PatientFilterModal,
  type PatientFilterState,
} from "@/components/shared/PatientFilterModal";

const ITEMS_PER_PAGE = 6;

export default function PatientManagementPage() {
  const [patientDetails, setPatientDetails] = useState<PatientBasicInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<PatientFilterState>(
    defaultPatientFilters,
  );
  const [page, setPage] = useState<number>(1);

  const fetchPatients = async () => {
    try {
      const getPatients = await getAllPatients();
      const data = getPatients.data;
      if (data) {
        setPatientDetails(data);
      } else {
        setPatientDetails([]);
      }
    } catch (error: any) {
      toast.error(error?.message);
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
        det.user.email?.toLowerCase().includes(q);

      if (!match) return false;
    }

    if (
      filters.gender !== "ALL" &&
      det.patient.gender !== filters.gender.toUpperCase()
    ) {
      return false;
    }
    const activeStatus = det.user ? det.user.isActive ? "ACTIVE" : "INACTIVE" : "INACTIVE"

    if (filters.status !== "ALL" && filters.status !== activeStatus)
      return false;

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
    <div className="min-h-full p-6 lg:p-8 space-y-6 relative border border-white/10 bg-white/2 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1dc465]/15 border border-[#1dc465]/25 flex items-center justify-center shrink-0">
            <Users size={24} className="text-[#1dc465]" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              Patient Management
            </h1>
            <p className="text-[#8b9ab0] text-sm mt-0.5">
              Monitor and manage all registered patients
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
            placeholder="Search by Patient name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#0d1a27] border border-white/8 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:border-[#1dc465]/50 focus:ring-1 focus:ring-[#1dc465]/20 outline-none transition-all placeholder:text-[#4a5568] shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#8b9ab0] text-sm font-bold">
          <span>Total Patients</span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-800 text-primary">
            {filteredPatients.length}
          </span>
        </div>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex cursor-pointer items-center justify-center gap-2 px-6 py-3 bg-[#0d1a27] border border-white/8 rounded-xl text-[#8b9ab0] text-sm font-bold hover:text-white hover:border-[#1dc465]/50 hover:bg-[#1dc465]/5 transition-all w-full md:w-auto"
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
      />

      {paginatedPatients.length === 0 ? (
        <AllApprovals icon={Users} name="Patients" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginatedPatients.map((det) => (
            <PatientListItem key={det.patient?.id} patientInfo={det} setPatientInfo={setPatientDetails} />
          ))}
        </div>
      )}

      {totalPages >= 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredPatients.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
          colorCode="WHITE"
        />
      )}
    </div>
  );
}
