import React, { useEffect } from "react";
import { LayoutGrid, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationalModal from "@/components/shared/delete-confirmational-modal.shared";
import { AllApprovals } from "@/components/shared/admin/all-approvals.shared";
import { Pagination } from "@/components/layout/pagination.layout";
import DepartmentCard from "@/components/shared/admin/departments/department-card.shared";
import DepartmentCardSkeleton from "@/components/shared/skeletons/department-card.skeleton";
import { AnimatePresence, motion } from "framer-motion";
import AdminPageHeader from "@/components/shared/page-header.shared";
import { useAuthStore } from "@/store";
import { getDepartmentTheme } from "@/helpers/admin/departments.helper";
import { useDepartmentManagement } from "@/hooks/use-department-management.hook";

const DepartmentPage: React.FC = () => {
  const navigate = useNavigate();

  const admin = useAuthStore((state) => state.users.admin);
  const isDark = admin?.theme === "DARK";

  const theme = getDepartmentTheme(isDark);

  const {
    departmentList,
    isLoading,
    searchQuery,
    handleSearchChange,
    isOpen,
    selectedDept,
    handleDelete,
    closeDeleteBox,
    onUpdate,
    page,
    setPage,
    totalDepartments,
    totalPages,
    itemsPerPage,
  } = useDepartmentManagement();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [page]);

  return (
    <div
      id="department-page"
      className={`min-h-full p-6 lg:p-8 space-y-6 border shadow-2xs ${theme.container}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminPageHeader
          icon={LayoutGrid}
          title="Department Management"
          description="Manage hospital departments"
          isDark={isDark}
        />

        <button
          onClick={() => navigate("/admin/department/add")}
          className="flex items-center gap-2 px-4 py-2 bg-primary rounded-[10px] font-bold hover:bg-primary/90 transition-colors text-primary-foreground cursor-pointer"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.searchIcon}`}
        />

        <input
          type="text"
          placeholder="Search all departments..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm outline-none transition-all ${theme.searchInput}`}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <DepartmentCardSkeleton key={i} isDark={isDark} />
          ))}
        </div>
      ) : departmentList.length === 0 ? (
        <div className="text-center py-12">
          <h1 className={theme.emptyState}>
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
              {departmentList.map((dept) => (
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

      {totalPages >= 1 && (
        <Pagination
          currentPage={page}
          itemsPerPage={itemsPerPage}
          totalItems={totalDepartments}
          totalPages={totalPages}
          onPageChange={setPage}
          isDark={isDark}
        />
      )}
    </div>
  );
};

export default DepartmentPage;
