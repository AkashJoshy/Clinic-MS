import React, { useEffect, useState } from "react";
import { ArrowLeft, LayoutGrid, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import FormFields from "@/components/shared/FormFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDepartmentSchema } from "@/schemas/admin/department.schema";
import type {
  DepartmentFormData,
  DepartmentUpdateFormData,
} from "@/schemas/admin/admin.schema";
import {
  DEPARTMENT_FORM_INPUTS,
  EDIT_DEPARTMENT_FORM_INPUTS,
} from "@/data/admin.data";
import {
  addDepartment,
  editDepartment,
  getDepartment,
} from "@/services/admin.service";
import { useMutate } from "@/hooks/useMutate";
import toast from "react-hot-toast";
import type { DepartmentData } from "@/types/admin";
import NotFound from "@/components/shared/NotFound";

const EditDepartmentPage: React.FC = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [department, setDepartment] = useState<DepartmentData | null>(null);
  const departmentId = param.deptId;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DepartmentUpdateFormData>({
    resolver: zodResolver(updateDepartmentSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!departmentId) return;
    const fetchDepartment = async () => {
      try {
        const dept = await getDepartment(departmentId);
        setDepartment(dept.data);
        reset(dept.data);
      } catch (error) {
        setNotFound(true);
      }
    };

    fetchDepartment();
  }, [departmentId]);

  const { isPending, mutateAsync } = useMutate(editDepartment, {
    onSuccess: () => navigate("/admin/departments"),
  });

  return (
    <div className="min-h-full p-4 lg:p-18 space-y-6 border border-white/10 bg-white/2 shadow-2xs">
      <div className="flex items-center gap-4 xsxs:mt-0 xsxs:ml-0 lg:-mt-10 lg:-ml-10">
        <button
          onClick={() => navigate("/admin/departments")}
          className="w-10 h-10 rounded-xl bg-[#0d1a27] border border-white/8 flex items-center justify-center text-[#8b9ab0] hover:text-white hover:border-white/15 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1dc465]/15 border border-[#1dc465]/25 flex items-center justify-center">
            <LayoutGrid size={20} className="text-[#1dc465]" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Edit Department</h1>
            <p className="text-[#8b9ab0] text-sm">
              Create a new department for the hospital
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 xsxs:mt-0">
        <div className="w-full max-w-3xl bg-[#0d1a27] border border-white/8 rounded-2xl p-6 md:p-8">
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
              }

              mutateAsync(data);
            })}
            className="space-y-6"
          >
            {!notFound ? (
              <FormFields<DepartmentUpdateFormData>
                fields={EDIT_DEPARTMENT_FORM_INPUTS}
                register={register}
                errors={errors}
                control={control}
                containerClass="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white text-sm focus:border-[#1dc465]/50 outline-none transition-all"
              />
            ) : (
              <div>
                <NotFound
                  name="Departments"
                  description={
                    "The department may have been deleted or doesn't exist."
                  }
                  toNavigate={"/admin/departments"}
                />
              </div>
            )}

            {!notFound && (
              <div className="xsxs:block xxs:flex items-center gap-3 pt-4">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => navigate("/admin/departments")}
                  className="flex-1 px-4 w-full py-3 bg-transparent border border-white/8 text-white rounded-xl text-sm font-semibold hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex w-full xsxs:mt-2 xxs:mt-0 items-center justify-center gap-2 px-4 py-3 bg-[#1dc465] text-[#080d14] rounded-xl text-sm font-semibold hover:bg-[#15a050] transition-all cursor-pointer"
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