import { Pencil, Trash } from "lucide-react";
import { MdRestoreFromTrash } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { DepartmentCardProps } from "@/types/admin";

const DepartmentCard = ({ department, handleDelete }: DepartmentCardProps) => {
  const navigate = useNavigate();

  const isActive = department.status === "ACTIVE";

  const handleStatusChange = () => {
    handleDelete({
      id: department.id,
      name: department.name,
      status: department.status,
      action: isActive ? "BLOCK" : "RESTORE",
    });
  };

  return (
    <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-4 hover:border-white/15 transition-all duration-200 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1dc465]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[#1dc465] font-semibold text-sm">
            {department.name[0].toUpperCase()}
          </span>
        </div>

        <h3 className="text-white font-semibold text-sm truncate">
          {department.name}
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

          {department.status}
        </span>

        {department.mode && (
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-[#8b9ab0]">
            {department.mode}
          </span>
        )}
      </div>

      <div className="border-t border-white/8" />

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#8b9ab0]">Hospital dept.</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/department/edit/${department.id}`)}
            className="p-1.5 rounded-lg text-[#8b9ab0] hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
            aria-label="Edit department"
          >
            <Pencil size={15} className="cursor-pointer" />
          </button>

          <button
            onClick={handleStatusChange}
            className={`p-1.5 rounded-lg text-[#8b9ab0] transition-colors ${
              isActive
                ? "hover:text-rose-400 hover:bg-rose-500/10"
                : "hover:text-[#1dc465] hover:bg-[#1dc465]/10"
            }`}
            aria-label={isActive ? "Delete department" : "Restore department"}
          >
            {isActive ? (
              <Trash size={15} className="cursor-pointer" />
            ) : (
              <MdRestoreFromTrash size={15} className="cursor-pointer" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
