
import React from "react";
import { ArrowLeft, LayoutGrid, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormFields from "@/components/shared/form-fields.shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DepartmentFormData } from "@/schemas/admin/admin.schema";
import { DEPARTMENT_FORM_INPUTS } from "@/data/admin.data";
import { addDepartment } from "@/services/admin.service";
import { useMutate } from "@/hooks/use-mutate.hook";
import { departmentSchema } from "@/schemas/admin/department.schema";
import AdminPageHeader from "@/components/shared/page-header.shared";
import { useAuthStore } from "@/store";

const AddDepartmentPage: React.FC = () => {
  const navigate = useNavigate();

  const admin = useAuthStore((state) => state.users.admin);
  const isDark = admin?.theme === "DARK";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    mode: "onChange",
  });

  const { isPending, mutateAsync } = useMutate(addDepartment, {
    onSuccess: () => navigate("/admin/departments"),
  });

  const theme = {
    page: isDark ? "border-white/10 bg-white/2" : "border-gray-200 bg-gray-50",
    backButton: isDark
      ? "bg-[#0d1a27] border-white/8 text-[#8b9ab0] hover:text-white hover:border-white/15"
      : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300",
    formCard: isDark
      ? "bg-[#0d1a27] border-white/8"
      : "bg-white border-gray-200",
    input: isDark
      ? "bg-white/5 border-white/8 text-white placeholder:text-[#8b9ab0] focus:border-primary/50"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary/50",
    cancelButton: isDark
      ? "border-white/8 text-white hover:bg-white/5"
      : "border-gray-200 text-gray-700 hover:bg-gray-100",
  };

  return (
    <div
      className={`min-h-full p-4 lg:p-18 space-y-6 border shadow-2xs ${theme.page}`}
    >
      <div className="flex items-center gap-4 xsxs:mt-0 xsxs:ml-0 lg:-mt-10 lg:-ml-10">
        <button
          onClick={() => navigate("/admin/departments")}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${theme.backButton}`}
        >
          <ArrowLeft size={20} />
        </button>

        <AdminPageHeader
          icon={LayoutGrid}
          title="Department Management"
          description="Manage hospital departments"
        />
      </div>

      <div className="flex justify-center px-4 xsxs:mt-0 md:mt-10">
        <div
          className={`w-full max-w-3xl border rounded-2xl p-6 md:p-8 ${theme.formCard}`}
        >
          <form
            onSubmit={handleSubmit(async (data) => {
              await mutateAsync(data);
            })}
            className="space-y-6"
          >
            <FormFields<DepartmentFormData>
              fields={DEPARTMENT_FORM_INPUTS}
              register={register}
              errors={errors}
              control={control}
              containerClass={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all ${theme.input}`}
              isDark={isDark}
            />

            <div className="xsxs:block xxs:flex items-center gap-3 pt-4">
              <button
                type="button"
                disabled={isPending}
                onClick={() => navigate("/admin/departments")}
                className={`flex-1 px-4 w-full py-3 bg-transparent border rounded-xl text-sm font-semibold transition-all ${theme.cancelButton}`}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="flex-1 flex w-full xsxs:mt-2 xxs:mt-0 items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <Save size={18} />
                {isPending ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentPage;
