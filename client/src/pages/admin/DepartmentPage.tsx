import React, { useEffect, useRef, useState } from "react";
import { LayoutGrid, Pencil, Plus, Search, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationalModal from "@/components/shared/DeleteConfirmationalModal";
import { useMutate } from "@/hooks/useMutate";
import { updateDepartment } from "@/services/admin.service";
import { getAllDepartments } from "@/services/common.service";
import { MdRestoreFromTrash } from "react-icons/md";
import { AllApprovals } from "@/components/shared/admin/AllApprovals";
import { Pagination } from "@/components/layout/Pagination";
import type { DepartmentData, SelectedDept } from "@/types/admin";

const ITEMS_PER_PAGE = 6;

const DepartmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [allDepartments, setAllDepartments] = useState<DepartmentData[] | []>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedDept, setSelectedDept] = useState<
    (SelectedDept & { action: "DELETE" | "RESTORE" }) | null
  >(null);
  const [page, setPage] = useState<number>(1);

  const { isPending, mutate } = useMutate(updateDepartment, {
    onSuccess: () => setOpen(false),
  });

  const filteredDepartments = allDepartments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  function handleDelete({
    id,
    name,
    status,
    action,
  }: SelectedDept & { action: "DELETE" | "RESTORE" }) {
    setSelectedDept({ id, name, status, action });
    setOpen((prev) => !prev);
  }

  function closeDeleteBox() {
    setOpen(false);
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      let response = await getAllDepartments();
      const data = response.data;
      setAllDepartments(data);
    };

    fetchDepartments();
  }, [allDepartments]);

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
          className="flex items-center gap-2 px-4 py-2 bg-[#1dc465] rounded-[10px] font-semibold hover:bg-[#15a050] transition-colors cursor-pointer"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDepartments.map((dept) => {
          const isActive = dept.status === "ACTIVE";

          return (
            <div
              key={dept.id}
              className="bg-[#0d1a27] border border-white/8 rounded-2xl p-4 hover:border-white/15 transition-all duration-200 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1dc465]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1dc465] font-semibold text-sm">
                    {dept.name[0].toUpperCase()}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm truncate">
                  {dept.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                    isActive
                      ? "bg-[#1dc465]/10 text-[#1dc465]"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-[#1dc465]" : "bg-rose-400"
                    }`}
                  />
                  {dept.status}
                </span>

                {dept.mode && (
                  <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-[#8b9ab0]">
                    {dept.mode}
                  </span>
                )}
              </div>

              <div className="border-t border-white/8" />

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8b9ab0]">Hospital dept.</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/department/edit/${dept.id}`)
                    }
                    className="p-1.5 rounded-lg text-[#8b9ab0] hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                    aria-label="Edit department"
                  >
                    <Pencil size={15} className="cursor-pointer" />
                  </button>

                  <button
                    onClick={() => {
                      if (dept.status === "ACTIVE") {
                        handleDelete({
                          id: dept.id,
                          name: dept.name,
                          status: dept.status,
                          action: "DELETE",
                        });
                      } else {
                        handleDelete({
                          id: dept.id,
                          name: dept.name,
                          status: dept.status,
                          action: "RESTORE",
                        });
                      }
                    }}
                    className={`p-1.5 rounded-lg text-[#8b9ab0] ${
                      isActive
                        ? "hover:text-rose-400 hover:bg-rose-500/10"
                        : "hover:text-[#1dc465] hover:bg-[#1dc465]/10"
                    } transition-colors`}
                    aria-label={
                      isActive ? "Delete department" : "Restore department"
                    }
                  >
                    {isActive ? (
                      <Trash size={15} className="cursor-pointer" />
                    ) : (
                      <MdRestoreFromTrash
                        size={15}
                        className="cursor-pointer"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#8b9ab0]">
            <AllApprovals name="Departments" />
          </p>
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
            service={mutate}
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