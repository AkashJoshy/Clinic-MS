import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, X } from "lucide-react";
import {
  DOCTOR_REAPPLICATION_FIELDS,
  DOCUMENT_REJECTION_REASONS,
} from "@/constants/admin.constant";
import type { RejectPatientData } from "@/schemas/admin/admin.schema";
import { rejectDoctorSchema } from "@/schemas/admin/doctor.schema";
import toast from "react-hot-toast";
import { getRejectModalTheme } from "@/helpers/common.helper";

interface RejectModalProps<T> {
  id: string;
  name: string;
  onConfirm: (data: RejectPatientData) => void;
  onClose: () => void;
  mutateFn: (data: T) => void | Promise<void>;
  isDark: boolean;
}

export const RejectModal = <T,>({
  id,
  name,
  onConfirm,
  onClose,
  mutateFn,
  isDark,
}: RejectModalProps<T>) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RejectPatientData>({
    resolver: zodResolver(rejectDoctorSchema),
    defaultValues: {
      doctorId: id,
      rejectedReason: undefined,
      rejectedMessage: "",
      fields: [],
    },
  });

  const fieldsToDelete = watch("fields") ?? [];
  const rejectedReason = watch("rejectedReason");

  const theme = getRejectModalTheme(isDark)

  const handleFieldSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value;

    if (!value) return;

    if (!fieldsToDelete.includes(value)) {
      setValue("fields", [...fieldsToDelete, value], {
        shouldValidate: true,
      });
    }

    e.target.value = "";
  };

  const removeField = (field: string) => {
    setValue(
      "fields",
      fieldsToDelete.filter((item) => item !== field),
      { shouldValidate: true },
    );
  };

  const onSubmit = async (data: RejectPatientData) => {
    try {
      await mutateFn(data as T);
      onConfirm(data);
    } catch {
      toast.error("Failed to process rejection.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${theme.modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10">
            <AlertTriangle size={18} className="text-rose-400" />
          </div>

          <div>
            <h3 className={`text-base font-semibold ${theme.heading}`}>
              Reject Doctor
            </h3>

            <p className={`mt-0.5 text-sm ${theme.muted}`}>
              You are rejecting{" "}
              <span className={`font-medium ${theme.heading}`}>
                {name}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`ml-auto shrink-0 cursor-pointer transition-colors ${theme.closeButton}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. Reason for Rejection */}
        <div className="mb-5">
          <label className={`mb-2 block text-sm font-medium ${theme.text}`}>
            Reason for Rejection <span className="text-rose-400">*</span>
          </label>

          <select
            {...register("rejectedReason")}
            className={`w-full cursor-pointer rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${theme.input} ${theme.inputFocus} ${
              errors.rejectedReason
                ? "border-rose-500/60"
                : ""
            }`}
          >
            <option value="" disabled>
              Select a reason
            </option>

            {DOCUMENT_REJECTION_REASONS.map((reason) => (
              <option key={reason} value={reason}>
                {reason
                  .replaceAll("_", " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            ))}
          </select>

          {errors.rejectedReason && (
            <p className="mt-1.5 text-xs text-rose-400">
              {errors.rejectedReason.message}
            </p>
          )}
        </div>

        {/* 2. More Information */}
        <div className="mb-5">
          <label className={`mb-2 block text-sm font-medium ${theme.text}`}>
            More Information{" "}
            <span className={`text-xs font-normal ${theme.muted}`}>
              (Optional)
            </span>
          </label>

          <textarea
            {...register("rejectedMessage")}
            rows={3}
            placeholder="Provide additional details about the rejection..."
            className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${theme.input} ${theme.inputFocus} ${
              errors.rejectedMessage ? "border-rose-500/60" : ""
            }`}
          />

          {errors.rejectedMessage && (
            <p className="mt-1.5 text-xs text-rose-400">
              {errors.rejectedMessage.message}
            </p>
          )}
        </div>

        {/* 3. Fields to Delete */}
        <div className="mb-5">
          <label className={`mb-2 block text-sm font-medium ${theme.text}`}>
            Fields to Delete{" "}
            <span className={`text-xs font-normal ${theme.muted}`}>
              (Optional)
            </span>
          </label>

          <select
            defaultValue=""
            onChange={handleFieldSelect}
            className={`w-full cursor-pointer rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${theme.input} ${theme.inputFocus}`}
          >
            <option value="" disabled>
              Select fields to delete
            </option>

            {rejectedReason ? (
              DOCTOR_REAPPLICATION_FIELDS.map((field) => (
                <option
                  key={field.value}
                  value={field.value}
                  disabled={fieldsToDelete.includes(field.value)}
                >
                  {field.label}
                </option>
              ))
            ) : (
              <option disabled>Options unavailable</option>
            )}
          </select>

          {/* Selected Fields */}
          {fieldsToDelete.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {fieldsToDelete.map((field) => {
                const fieldLabel =
                  DOCTOR_REAPPLICATION_FIELDS.find(
                    (item) => item.value === field,
                  )?.label ?? field;

                return (
                  <span
                    key={field}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/20 bg-rose-400/5 px-2.5 py-1 text-[10px] font-medium text-rose-400"
                  >
                    {fieldLabel}

                    <button
                      type="button"
                      onClick={() => removeField(field)}
                      className="cursor-pointer text-rose-400 transition-colors hover:text-rose-200"
                    >
                      <X size={11} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-150 ${theme.cancelButton}`}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit(
              onSubmit,
              () => toast.error("Please check the rejection form."),
            )}
            className="cursor-pointer rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-rose-600"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};