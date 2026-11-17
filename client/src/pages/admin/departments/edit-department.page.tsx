
import React, { useEffect, useState } from "react";
import { ArrowLeft, LayoutGrid, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import FormFields from "@/components/shared/form-fields.shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDepartmentSchema } from "@/schemas/admin/department.schema";
import type { DepartmentUpdateFormData } from "@/schemas/admin/admin.schema";
import { EDIT_DEPARTMENT_FORM_INPUTS } from "@/data/admin.data";
import { editDepartment, getDepartment } from "@/services/admin.service";
import { useMutate } from "@/hooks/use-mutate.hook";
import toast from "react-hot-toast";
import type { DepartmentData } from "@/types/admin";
import NotFound from "@/components/shared/not-found.shared";
import EditDepartmentSkeleton from "@/components/shared/skeletons/edit-department.skeleton";
import AdminPageHeader from "@/components/shared/page-header.shared";
import { useAuthStore } from "@/store";

const EditDepartmentPage: React.FC = () => {
  const navigate = useNavigate();
  const param = useParams();

  const admin = useAuthStore((state) => state.users.admin);
  const isDark = admin?.theme === "DARK";

  const [notFound, setNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [department, setDepartment] = useState<DepartmentData | null>(null);

  const departmentId = param.deptId;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DepartmentUpdateFormData>({
    resolver: zodResolver(updateDepartmentSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!departmentId) return;

    const fetchDepartment = async () => {
      setIsLoading(true);

      try {
        const dept = await getDepartment(departmentId);
        setDepartment(dept.data);
        reset(dept.data);
      } catch (error) {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartment();
  }, [departmentId, reset]);

  const { isPending, mutateAsync } = useMutate(editDepartment, {
    onSuccess: () => navigate("/admin/departments"),
  });

  return (
    <div
      className={`min-h-full p-4 lg:p-18 space-y-6 border shadow-2xs ${
        isDark
          ? "border-white/10 bg-white/2"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-4 xsxs:mt-0 xsxs:ml-0 lg:-mt-10 lg:-ml-10">
        <button
          onClick={() => navigate("/admin/departments")}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
            isDark
              ? "bg-[#0d1a27] border-white/8 text-[#8b9ab0] hover:text-white hover:border-white/15"
              : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
          }`}
        >
          <ArrowLeft size={20} />
        </button>

        <AdminPageHeader
          icon={LayoutGrid}
          title="Department Management"
          description="Manage hospital departments"
        />
      </div>

      <div className="flex justify-center px-4 xsxs:mt-0">
        <div
          className={`w-full max-w-3xl border rounded-2xl p-6 md:p-8 ${
            isDark
              ? "bg-[#0d1a27] border-white/8"
              : "bg-white border-gray-200"
          }`}
        >
          <form
            onSubmit={handleSubmit(async (data) => {
              const hasChanged =
                data.id !== department?.id ||
                data.name !== department?.name ||
                data.status !== department?.status ||
                data.mode !== department?.mode;

              if (!hasChanged) {
                navigate("/admin/departments");
                return;
              }

              if (!data.id) {
                toast.error("Department detail is missing");
                return;
              }

              await mutateAsync(data);
            })}
            className="space-y-6"
          >
            {isLoading ? (
              <EditDepartmentSkeleton isDark={isDark} />
            ) : !notFound ? (
              <FormFields<DepartmentUpdateFormData>
                fields={EDIT_DEPARTMENT_FORM_INPUTS}
                register={register}
                errors={errors}
                control={control}
                isDark={isDark}
                containerClass={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all ${
                  isDark
                    ? "bg-white/5 border-white/8 text-white focus:border-primary/50"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary/50"
                }`}
              />
            ) : (
              <div>
                <NotFound
                  name="Departments"
                  description="The department may have been deleted or doesn't exist."
                  toNavigate="/admin/departments"
                />
              </div>
            )}

            {!notFound && !isLoading && (
              <div className="xsxs:block xxs:flex items-center gap-3 pt-4">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => navigate("/admin/departments")}
                  className={`flex-1 px-4 w-full py-3 bg-transparent border rounded-xl text-sm font-semibold transition-all ${
                    isDark
                      ? "border-white/8 text-white hover:bg-white/5"
                      : "border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 flex w-full xsxs:mt-2 xxs:mt-0 items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  {isPending ? "Saving" : "Save"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDepartmentPage;
