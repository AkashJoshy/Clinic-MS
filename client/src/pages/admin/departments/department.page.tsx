import React, { useEffect, useState } from "react";
import { LayoutGrid, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationalModal from "@/components/shared/delete-confirmational-modal.shared";
import { useMutate } from "@/hooks/use-mutate.hook";
import { updateDepartment } from "@/services/admin.service";
import { getAllDepartments } from "@/services/shared.service";
import { AllApprovals } from "@/components/shared/admin/all-approvals.shared";
import { Pagination } from "@/components/layout/pagination.layout";
import type { DepartmentData, SelectedDept } from "@/types/admin";
import type { UpdateMethods } from "@/types/common";
import DepartmentCard from "@/components/shared/admin/departments/department-card.shared";
import DepartmentCardSkeleton from "@/components/shared/skeletons/department-card.skeleton";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import AdminPageHeader from "@/components/shared/page-header.shared";
import { useAuthStore } from "@/store";

const ITEMS_PER_PAGE = 6;

const DepartmentPage: React.FC = () => {
  const navigate = useNavigate();

  const admin = useAuthStore((state) => state.users.admin);
  const isDark = admin?.theme === "DARK";

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allDepartments, setAllDepartments] = useState<DepartmentData[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedDept, setSelectedDept] = useState<
    (SelectedDept & { action: UpdateMethods }) | null
  >(null);
  const [page, setPage] = useState<number>(1);

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const response = await getAllDepartments();
      const data = response.data;

      if (data) {
        setAllDepartments(data);
      } else {
        setAllDepartments([]);
      }
    } catch (error) {
      toast.error("Error fetching departments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const { mutate } = useMutate(updateDepartment, {
    onSuccess: (data) => {
      setAllDepartments((prev) => {
        return prev.map((dept) => {
          if (dept.id === data.data?.departmentId) {
            return {
              ...dept,
              status: data.data?.status,
            };
          }

          return dept;
        });
      });

      setOpen(false);
    },
  });

  function onUpdate() {
    if (selectedDept && selectedDept.id) {
      mutate({ id: selectedDept.id, status: selectedDept.status });
    }
  }

  const filteredDepartments = allDepartments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  function handleDelete({
    id,
    name,
    status,
    action,
  }: SelectedDept & { action: UpdateMethods }) {
    setSelectedDept({ id, name, status, action });
    setOpen((prev) => !prev);
  }

  function closeDeleteBox() {
    setOpen(false);
  }

  const totalItems = filteredDepartments.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div
      className={`min-h-full p-6 lg:p-8 space-y-6 border shadow-2xs ${
        isDark ? "border-white/10 bg-white/2" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminPageHeader
          icon={LayoutGrid}
          title="Department Management"
          description="Manage hospital departments"
        />

        <button
          onClick={() => navigate("/admin/department/add")}
          className={`flex items-center gap-2 px-4 py-2 bg-primary rounded-[10px] font-bold hover:bg-primary/90 transition-colors text-primary-foreground cursor-pointer`}
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
            isDark ? "text-[#8b9ab0]" : "text-gray-400"
          }`}
        />

        <input
          type="text"
          placeholder="Search all departments..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm outline-none transition-all ${
            isDark
              ? "bg-[#0d1a27] border-white/8 text-white placeholder:text-[#8b9ab0] focus:border-primary/50"
              : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary/50"
          }`}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <DepartmentCardSkeleton key={i} isDark={isDark} />
          ))}
        </div>
      ) : filteredDepartments.length === 0 ? (
        <div className="text-center py-12">
          <h1 className={isDark ? "text-[#8b9ab0]" : "text-gray-500"}>
            <AllApprovals name="Departments" isDark={isDark} />
          </h1>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDepartments.map((dept) => (
                <DepartmentCard
                  key={dept.id}
                  department={dept}
                  handleDelete={handleDelete}
                  isDark={isDark}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {isOpen && selectedDept && (
        <DeleteConfirmationalModal
          id={selectedDept.id}
          name={selectedDept.name}
          type="Department"
          action={selectedDept.action}
          status={selectedDept.status}
          service={onUpdate}
          closeDeleteBox={closeDeleteBox}
          isDark={isDark}
        />
      )}

      <Pagination
        currentPage={page}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={setPage}
        isDark={isDark}
      />
    </div>
  );
};

export default DepartmentPage;
