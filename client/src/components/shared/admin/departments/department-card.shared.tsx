
import { Pencil, Trash } from "lucide-react";
import { MdRestoreFromTrash } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { DepartmentCardProps } from "@/types/admin";

const DepartmentCard = ({
  department,
  handleDelete,
  isDark,
}: DepartmentCardProps) => {
  const navigate = useNavigate();

  const isActive = department.status === "ACTIVE";

  const theme = {
    card: isDark
      ? "bg-[#0d1a27] border-white/8 hover:border-white/15"
      : "bg-white border-gray-200 hover:border-gray-300",
    title: isDark ? "text-white" : "text-gray-900",
    muted: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    modeBadge: isDark
      ? "bg-white/5 text-[#8b9ab0]"
      : "bg-gray-100 text-gray-600",
    divider: isDark ? "border-white/8" : "border-gray-200",
  };

  const handleStatusChange = () => {
    handleDelete({
      id: department.id,
      name: department.name,
      status: department.status,
      action: isActive ? "BLOCK" : "RESTORE",
    });
  };

  return (
    <div
      className={`border rounded-2xl p-4 transition-all duration-200 flex flex-col gap-3 ${theme.card}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-primary font-semibold text-sm">
            {department.name[0].toUpperCase()}
          </span>
        </div>

        <h3 className={`font-semibold text-sm truncate ${theme.title}`}>
          {department.name}
        </h3>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            isActive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-rose-500/10 text-rose-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive ? "bg-emerald-400" : "bg-rose-400"
            }`}
          />

          {department.status}
        </span>

        {department.mode && (
          <span
            className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${theme.modeBadge}`}
          >
            {department.mode}
          </span>
        )}
      </div>

      <div className={`border-t ${theme.divider}`} />

      <div className="flex items-center justify-between">
        <span className={`text-xs ${theme.muted}`}>Hospital dept.</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate(`/admin/department/edit/${department.id}`)
            }
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? "text-[#8b9ab0] hover:text-blue-400 hover:bg-blue-500/10"
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Edit department"
          >
            <Pencil size={15} className="cursor-pointer" />
          </button>

          <button
            onClick={handleStatusChange}
            className={`p-1.5 rounded-lg transition-colors ${
              isActive
                ? "text-[#8b9ab0] hover:text-rose-400 hover:bg-rose-500/10"
                : "text-[#8b9ab0] hover:text-primary hover:bg-primary/10"
            } ${
              !isDark && "text-gray-500"
            }`}
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
};

export default DepartmentCard;
