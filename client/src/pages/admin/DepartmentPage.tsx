import React, { useEffect, useState } from "react";
import { LayoutGrid, Pencil, Plus, Search, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationalModal from "@/components/shared/DeleteConfirmationalModal";
import { useMutate } from "@/hooks/useMutate";
import { updateDepartment } from "@/services/admin.service";
import { getAllDepartments } from "@/services/common.service";
import { AllApprovals } from "@/components/shared/admin/AllApprovals";
import { Pagination } from "@/components/layout/Pagination";
import type { DepartmentData, SelectedDept } from "@/types/admin";
import type { UpdateMethods } from "@/types/common";
import DepartmentCard from "@/components/shared/admin/DepartmentCard";
import DepartmentCardSkeleton from "@/components/shared/admin/DepartmentCardSkeleton";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

const DepartmentPage: React.FC = () => {
  const navigate = useNavigate();
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
      setIsLoading(true)
      let response = await getAllDepartments();
      const data = response.data;
      if (data) {
        setAllDepartments(data);
        setIsLoading(false)
      } else {
        setAllDepartments([]);
        setIsLoading(false)
      }
    } catch (error) {
      toast.error("Error fetching departments")
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const { mutate } = useMutate(updateDepartment, {
    onSuccess: (data) => {
      setAllDepartments((prev) => {
        const updatedDepts = prev.map((dept) => {
          if (dept.id === data.data?.departmentId) {
            return {
              ...dept,
              status: data.data?.status,
            };
          }

          return dept;
        });

        return updatedDepts;
      });
      setOpen(false);
    },
  });

  function onUpdate() {
    if (selectedDept && selectedDept.id) {
      mutate({ id: selectedDept?.id, status: selectedDept?.status });
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
  const totalPages = Math.ceil(filteredDepartments.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-full p-6 lg:p-8 space-y-6 border border-white/10 bg-white/2 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1dc465]/15 border border-[#1dc465]/25 flex items-center justify-center">
            <LayoutGrid size={20} className="text-[#1dc465]" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">
              Department Management
            </h1>
            <h6 className="text-[#8b9ab0] text-sm">
              Manage hospital departments
            </h6>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/department/add")}
          className="flex items-center gap-2 px-4 py-2 bg-[#1dc465] rounded-[10px] font-bold hover:bg-[#15a050] transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9ab0]"
        />
        <input
          type="text"
          placeholder="Search all departments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#0d1a27] border border-white/8 rounded-xl text-white text-sm focus:border-[#1dc465]/50 outline-none transition-all"
        />
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDepartments.map((dept) => (
          <DepartmentCard department={dept} handleDelete={handleDelete} />
        ))}
      </div> */}

      {/* {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <h1 className="text-[#8b9ab0]">
            <AllApprovals name="Departments" />
          </h1>
        </div>
      )} */}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <DepartmentCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredDepartments.length === 0 ? (
        <div className="text-center py-12">
          <h1 className="text-[#8b9ab0]">
            <AllApprovals name="Departments" />
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDepartments.map((dept) => (
            <DepartmentCard department={dept} handleDelete={handleDelete} />
          ))}
        </div>
      )}

      {isOpen &&
        (selectedDept ? (
          <DeleteConfirmationalModal
            id={selectedDept.id}
            name={selectedDept.name}
            type="Department"
            action={selectedDept.action}
            status={selectedDept.status}
            service={onUpdate}
            closeDeleteBox={closeDeleteBox}
          />
        ) : (
          ""
        ))}

      <Pagination
        currentPage={page}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={setPage}
        colorCode="WHITE"
      />
    </div>
  );
};

export default DepartmentPage;
