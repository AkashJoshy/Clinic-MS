import React, { useRef, useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  Save,
  RotateCcw,
  Loader2,
} from "lucide-react";

import {
  panDetailsSchema,
  type PanFormInput,
  type PanFormValues,
} from "@/schemas/doctor/settings/kyc-settings.schema";

import { Field } from "@/components/shared/admin/settings/settings-ui.component";

import {
  inputClass,
  primaryButton,
  ghostButton,
} from "@/constants/admin-settings.constant";

import type { KycStatus } from "@/types/doctor-settings";

import ImagePreviewZoom from "@/components/shared/image-preview-zoom.shared";
import DocumentPreviewThumbnail from "@/components/shared/document-preview-thumbnail.shared";

import { useMutate } from "@/hooks/use-mutate.hook";
import { updatePanDetails } from "@/services/doctor.service";

export interface PanDetailsResponse {
  section: "KYC_PAN";
  panNumber: string;
  maskedPanNumber: string;
  nameOnPan: string;
  dateOfBirth: string;
  panCardDoc: string;
  status: KycStatus;
  rejectionReason: string | null;
  updatedAt: Date;
}

export interface PanCardItemProps {
  details: PanDetailsResponse;
  isDark: boolean;
}

export const PanCardItem: React.FC<PanCardItemProps> = ({
  details,
  isDark,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<KycStatus>(details.status);
  const [panDetails, setPanDetails] = useState<PanDetailsResponse>(details);

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    details.panCardDoc || null,
  );

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [previewType, setPreviewType] = useState<"image" | "pdf">(
    details.panCardDoc?.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
  );

  const panUploadRef = useRef<HTMLInputElement | null>(null);
  const pendingPayloadRef = useRef<PanFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PanFormInput, unknown, PanFormValues>({
    resolver: zodResolver(panDetailsSchema),
    defaultValues: {
      section: "KYC_PAN",
      panNumber: details.panNumber ?? "",
      nameOnPan: details.nameOnPan ?? "",
      dateOfBirth: details.dateOfBirth ?? "",
      panCardDoc: details.panCardDoc || undefined,
    },
  });

  // Synchronize API details with the component.
  useEffect(() => {
    setPanDetails(details);
    setStatus(details.status);

    reset({
      section: "KYC_PAN",
      panNumber: details.panNumber ?? "",
      nameOnPan: details.nameOnPan ?? "",
      dateOfBirth: details.dateOfBirth ?? "",
      panCardDoc: details.panCardDoc || undefined,
    });

    setPreviewUrl(details.panCardDoc || null);

    setPreviewType(
      details.panCardDoc?.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
    );
  }, [details, reset]);

  // Cleanup temporary object URLs.
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const openUpload = () => {
    panUploadRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);
    setPreviewType(file.type === "application/pdf" ? "pdf" : "image");

    setValue("panCardDoc", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    event.target.value = "";
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const themedInputClass = `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  const { mutate, isPending } = useMutate(updatePanDetails, {
    onSuccess() {
      const submittedData = pendingPayloadRef.current;

      if (submittedData) {
        setPanDetails((previous) => ({
          ...previous,
          panNumber: submittedData.panNumber,
          maskedPanNumber: submittedData.panNumber
            ? `${submittedData.panNumber.slice(0, 2)}*****${submittedData.panNumber.slice(-2)}`
            : previous.maskedPanNumber,
          nameOnPan: submittedData.nameOnPan,
          dateOfBirth: submittedData.dateOfBirth,
        }));

        // Reset form values while preserving the existing document URL.
        // The backend retains the previous document when no new file is sent.
        reset({
          section: "KYC_PAN",
          panNumber: submittedData.panNumber,
          nameOnPan: submittedData.nameOnPan,
          dateOfBirth: submittedData.dateOfBirth,
          panCardDoc: panDetails.panCardDoc || undefined,
        });
      }

      setStatus("PENDING");
      setIsEditing(false);

      pendingPayloadRef.current = null;
    },
  });

  const onSubmit: SubmitHandler<PanFormValues> = async (data) => {
    const payload: PanFormValues = {
      ...data,
      section: "KYC_PAN",
    };

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "panCardDoc") {
        if (value instanceof File) {
          // Newly uploaded document
          formData.append("panCardDoc", value);
        } else {
          // Existing Cloudinary URL
          formData.append("panCardDoc", value);
        }

        return;
      }

      formData.append(key, String(value));
    });

    pendingPayloadRef.current = payload;

    mutate(formData);
  };

  // Restore original values when cancelling.
  const handleCancel = () => {
    reset({
      section: "KYC_PAN",
      panNumber: panDetails.panNumber ?? "",
      nameOnPan: panDetails.nameOnPan ?? "",
      dateOfBirth: panDetails.dateOfBirth ?? "",
      panCardDoc: panDetails.panCardDoc || undefined,
    });

    setPreviewUrl(panDetails.panCardDoc || null);

    setPreviewType(
      panDetails.panCardDoc?.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
    );

    setIsEditing(false);
  };

  // Enter edit mode.
  const handleEdit = () => {
    reset({
      section: "KYC_PAN",
      panNumber: panDetails.panNumber ?? "",
      nameOnPan: panDetails.nameOnPan ?? "",
      dateOfBirth: panDetails.dateOfBirth ?? "",
      panCardDoc: panDetails.panCardDoc || undefined,
    });

    setPreviewUrl(panDetails.panCardDoc || null);

    setPreviewType(
      panDetails.panCardDoc?.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
    );

    setIsEditing(true);
  };

  // Status badge.
  const getStatusBadge = () => {
    switch (status) {
      case "VERIFIED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={13} className="text-emerald-400" />
            Verified
          </span>
        );

      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock size={13} className="text-amber-400" />
            Under Verification
          </span>
        );

      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle size={13} className="text-rose-400" />
            Verification Failed
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            Not Submitted
          </span>
        );
    }
  };

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-colors ${
        isDark
          ? "bg-[#091420]/70 border-white/[0.08]"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-inherit">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <CreditCard size={20} className="text-primary" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h4
                className={`text-sm sm:text-base font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Permanent Account Number (PAN)
              </h4>

              {getStatusBadge()}
            </div>

            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Required for tax deductions at source (TDS) and platform payouts.
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={isPending || status === "VERIFIED"}
          onClick={() => {
            if (isEditing) {
              handleCancel();
            } else {
              handleEdit();
            }
          }}
          className={`${ghostButton} text-xs self-start sm:self-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isEditing ? "Close" : "Edit PAN Details"}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* PAN Number */}
            <div
              className={`p-3.5 rounded-xl border ${
                isDark
                  ? "bg-[#060c13] border-white/5"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <span
                className={`text-[11px] font-medium block uppercase tracking-wider ${
                  isDark ? "text-[#6b7c93]" : "text-gray-500"
                }`}
              >
                PAN Number
              </span>

              <span
                className={`text-sm font-semibold tracking-wider font-mono mt-1 block ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {panDetails.maskedPanNumber ||
                  panDetails.panNumber ||
                  "Not provided"}
              </span>
            </div>

            {/* Name on PAN */}
            <div
              className={`p-3.5 rounded-xl border ${
                isDark
                  ? "bg-[#060c13] border-white/5"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <span
                className={`text-[11px] font-medium block uppercase tracking-wider ${
                  isDark ? "text-[#6b7c93]" : "text-gray-500"
                }`}
              >
                Name on PAN
              </span>

              <span
                className={`text-sm font-medium mt-1 block truncate ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {panDetails.nameOnPan || "Not provided"}
              </span>
            </div>

            {/* Date of Birth */}
            <div
              className={`p-3.5 rounded-xl border ${
                isDark
                  ? "bg-[#060c13] border-white/5"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <span
                className={`text-[11px] font-medium block uppercase tracking-wider ${
                  isDark ? "text-[#6b7c93]" : "text-gray-500"
                }`}
              >
                Date of Birth
              </span>

              <span
                className={`text-sm font-medium mt-1 block ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {panDetails.dateOfBirth || "Not provided"}
              </span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* PAN Number */}
              <Field label="PAN Number" isDark={isDark}>
                <input
                  {...register("panNumber")}
                  className={`${themedInputClass} uppercase font-mono tracking-wider`}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  autoComplete="off"
                  disabled={isPending}
                />

                {errors.panNumber && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.panNumber.message}
                  </p>
                )}
              </Field>

              {/* Name on PAN */}
              <Field label="Full Name (as per PAN)" isDark={isDark}>
                <input
                  {...register("nameOnPan")}
                  className={themedInputClass}
                  placeholder="e.g. ALEXANDER WRIGHT"
                  autoComplete="name"
                  disabled={isPending}
                />

                {errors.nameOnPan && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.nameOnPan.message}
                  </p>
                )}
              </Field>

              {/* Date of Birth */}
              <Field label="Date of Birth" isDark={isDark}>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className={themedInputClass}
                  disabled={isPending}
                />

                {errors.dateOfBirth && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </Field>
            </div>

            {/* Existing document / selected document preview */}
            <DocumentPreviewThumbnail
              previewUrl={previewUrl}
              previewType={previewType}
              isDark={isDark}
              onPreview={openPreview}
              title="Click to preview PAN card"
            />

            {/* Document Upload */}
            <div
              className={`p-3 rounded-xl border border-dashed flex items-center gap-3 text-xs ${
                isDark
                  ? "border-white/10 bg-white/[0.02] text-[#8b9ab0]"
                  : "border-gray-300 bg-gray-50 text-gray-600"
              }`}
            >
              <FileText size={16} className="text-primary shrink-0" />

              <span>Attach PAN Card Document (PDF, JPG or PNG up to 5MB)</span>

              <input
                ref={panUploadRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
                disabled={isPending}
              />

              <button
                type="button"
                onClick={openUpload}
                disabled={isPending}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={12} />
                Upload
              </button>
            </div>

            {typeof errors.panCardDoc?.message === "string" && (
              <p className="text-xs text-rose-500 mt-1">
                {errors.panCardDoc.message}
              </p>
            )}

            {/* Rejection Reason */}
            {status === "REJECTED" && panDetails.rejectionReason && (
              <div className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-500">
                <strong>Rejection reason:</strong> {panDetails.rejectionReason}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className={`${ghostButton} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <RotateCcw size={14} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className={`${primaryButton} !text-white disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isPending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Updating PAN Details...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Update PAN Details
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Document Preview / Zoom */}
      <ImagePreviewZoom
        fileUrl={previewUrl}
        fileType={previewType}
        isOpen={isPreviewOpen}
        onClose={closePreview}
        title="PAN Card Preview"
      />
    </div>
  );
};

export default PanCardItem;
