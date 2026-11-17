import React, { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileBadge,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Upload,
  Save,
  RotateCcw,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  aadhaarDetailsSchema,
  type AadhaarFormInput,
  type AadhaarFormValues,
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
import { updateAadhaarDetails } from "@/services/doctor.service";

export interface AadhaarDetailsResponse {
  section: "KYC_AADHAAR";
  nameOnAadhaar: string;
  maskedAadhaarNumber: string;
  aadhaarNumber: string;
  aadhaarCardDoc: string;
  status: KycStatus;
  rejectionReason: string | null;
  updatedAt: Date;
}

export interface AadhaarItemProps {
  details: AadhaarDetailsResponse;
  isDark: boolean;
}

export const AadhaarItem: React.FC<AadhaarItemProps> = ({
  details,
  isDark,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [status, setStatus] = useState<KycStatus>(details.status);

  const [aadhaarDetails, setAadhaarDetails] =
    useState<AadhaarDetailsResponse>(details);

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    details.aadhaarCardDoc || null,
  );

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [previewType, setPreviewType] = useState<"image" | "pdf">(
    details.aadhaarCardDoc?.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
  );

  const aadhaarUploadRef = useRef<HTMLInputElement | null>(null);

  const pendingPayloadRef = useRef<AadhaarFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AadhaarFormInput, unknown, AadhaarFormValues>({
    resolver: zodResolver(aadhaarDetailsSchema),
    defaultValues: {
      section: "KYC_AADHAAR",
      aadhaarNumber: details.aadhaarNumber || "",
      nameOnAadhaar: details.nameOnAadhaar || "",
      aadhaarCardDoc: details.aadhaarCardDoc || undefined,
    },
  });

  // Synchronize API details with the component.
  useEffect(() => {
    setAadhaarDetails(details);
    setStatus(details.status);

    reset({
      section: "KYC_AADHAAR",
      aadhaarNumber: details.aadhaarNumber || "",
      nameOnAadhaar: details.nameOnAadhaar || "",
      aadhaarCardDoc: details.aadhaarCardDoc || undefined,
    });

    setPreviewUrl((previousUrl) => {
      if (previousUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previousUrl);
      }

      return details.aadhaarCardDoc || null;
    });

    setPreviewType(
      details.aadhaarCardDoc?.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
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

  const themedInputClass = `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  const openUpload = () => {
    aadhaarUploadRef.current?.click();
  };

  // Handle newly selected document.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG and PNG files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must not exceed 5MB.");
      event.target.value = "";
      return;
    }

    // Replace the existing URL string with the newly selected File.
    setValue("aadhaarCardDoc", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setPreviewUrl((previousUrl) => {
      if (previousUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previousUrl);
      }

      return URL.createObjectURL(file);
    });

    setPreviewType(file.type === "application/pdf" ? "pdf" : "image");

    // Allow selecting the same file again.
    event.target.value = "";
  };

  const openPreview = () => {
    if (!previewUrl) return;

    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const maskAadhaar = (aadhaarNumber: string) => {
    const clean = aadhaarNumber.replace(/\s+/g, "");

    if (clean.length !== 12) return "************";

    return `•••• •••• ${clean.slice(-4)}`;
  };

  const { mutate, isPending } = useMutate(updateAadhaarDetails, {
    onSuccess() {
      const submittedData = pendingPayloadRef.current;

      if (submittedData) {
        setAadhaarDetails((previous) => ({
          ...previous,
          aadhaarNumber: submittedData.aadhaarNumber,
          maskedAadhaarNumber: maskAadhaar(submittedData.aadhaarNumber),
          nameOnAadhaar: submittedData.nameOnAadhaar,
        }));

        // Preserve the existing document URL in the form.
        // Refresh the API details after upload to obtain a new URL
        // if a replacement document was uploaded.
        reset({
          section: "KYC_AADHAAR",
          aadhaarNumber: "",
          nameOnAadhaar: submittedData.nameOnAadhaar,
          aadhaarCardDoc:
            typeof submittedData.aadhaarCardDoc === "string"
              ? submittedData.aadhaarCardDoc
              : aadhaarDetails.aadhaarCardDoc || undefined,
        });
      }

      setStatus("PENDING");
      setIsEditing(false);

      pendingPayloadRef.current = null;
    },
  });

  const onSubmit: SubmitHandler<AadhaarFormValues> = (data) => {
    const formData = new FormData();

    formData.append("section", "KYC_AADHAAR");
    formData.append("aadhaarNumber", data.aadhaarNumber);
    formData.append("nameOnAadhaar", data.nameOnAadhaar);

    if (data.aadhaarCardDoc instanceof File) {
      // Newly selected document.
      formData.append("aadhaarCardDoc", data.aadhaarCardDoc);
    } else if (typeof data.aadhaarCardDoc === "string") {
      // Existing document URL.
      formData.append("aadhaarCardDoc", data.aadhaarCardDoc);
    }

    pendingPayloadRef.current = data;

    mutate(formData);
  };

  // Cancel editing.
  const handleCancel = () => {
    if (isPending) return;

    reset({
      section: "KYC_AADHAAR",
      aadhaarNumber: aadhaarDetails.aadhaarNumber || "",
      nameOnAadhaar: aadhaarDetails.nameOnAadhaar || "",
      aadhaarCardDoc: aadhaarDetails.aadhaarCardDoc || undefined,
    });

    setPreviewUrl((previousUrl) => {
      if (previousUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previousUrl);
      }

      return aadhaarDetails.aadhaarCardDoc || null;
    });

    setPreviewType(
      aadhaarDetails.aadhaarCardDoc?.toLowerCase().endsWith(".pdf")
        ? "pdf"
        : "image",
    );

    setIsPreviewOpen(false);
    setIsEditing(false);

    toast("Aadhaar changes discarded", {
      icon: "↩️",
    });
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
            Verification in Progress
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
            <FileBadge size={20} className="text-primary" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h4
                className={`text-sm sm:text-base font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Aadhaar Card (UIDAI)
              </h4>

              {getStatusBadge()}
            </div>

            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              National identity proof required for compliance and government
              digital healthcare registries (ABDM).
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
              setIsEditing(true);
            }
          }}
          className={`${ghostButton} text-xs self-start sm:self-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isEditing ? "Close" : "Update Aadhaar"}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Aadhaar Number */}
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
                Aadhaar Number
              </span>

              <span
                className={`text-sm font-semibold tracking-wider font-mono mt-1 block ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {aadhaarDetails.maskedAadhaarNumber || "Not provided"}
              </span>
            </div>

            {/* Name on Aadhaar */}
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
                Name on Aadhaar
              </span>

              <span
                className={`text-sm font-medium mt-1 block truncate ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {aadhaarDetails.nameOnAadhaar || "Not provided"}
              </span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Aadhaar Number */}
              <Field label="Aadhaar Number (12 digits)" isDark={isDark}>
                <input
                  {...register("aadhaarNumber")}
                  className={`${themedInputClass} font-mono tracking-wider`}
                  placeholder="8472 9182 3749"
                  maxLength={14}
                  autoComplete="off"
                  disabled={isPending}
                />

                {errors.aadhaarNumber && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.aadhaarNumber.message}
                  </p>
                )}
              </Field>

              {/* Name on Aadhaar */}
              <Field label="Name (as per Aadhaar Card)" isDark={isDark}>
                <input
                  {...register("nameOnAadhaar")}
                  className={themedInputClass}
                  placeholder="Full name as printed on Aadhaar"
                  autoComplete="name"
                  disabled={isPending}
                />

                {errors.nameOnAadhaar && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.nameOnAadhaar.message}
                  </p>
                )}
              </Field>
            </div>

            {/* Document Preview */}
            <DocumentPreviewThumbnail
              previewUrl={previewUrl}
              previewType={previewType}
              isDark={isDark}
              onPreview={openPreview}
              title="Click to preview Aadhaar card"
            />

            {/* Upload */}
            <div
              className={`p-3 rounded-xl border border-dashed flex items-center gap-3 text-xs ${
                isDark
                  ? "border-white/10 bg-white/[0.02] text-[#8b9ab0]"
                  : "border-gray-300 bg-gray-50 text-gray-600"
              }`}
            >
              <FileCheck size={16} className="text-primary shrink-0" />

              <span>
                Upload Aadhaar document (PDF, JPG or PNG up to 5MB). Use a
                masked Aadhaar copy wherever applicable.
              </span>

              <input
                ref={aadhaarUploadRef}
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
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                <Upload size={12} />
                Upload
              </button>
            </div>

            {typeof errors.aadhaarCardDoc?.message === "string" && (
              <p className="text-xs text-rose-500 mt-1">
                {errors.aadhaarCardDoc.message}
              </p>
            )}

            {/* Rejection Reason */}
            {status === "REJECTED" && aadhaarDetails.rejectionReason && (
              <div className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-500">
                <strong>Rejection reason:</strong>{" "}
                {aadhaarDetails.rejectionReason}
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
                className={`${primaryButton} !text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Update Aadhaar Details
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
        title="Aadhaar Card Preview"
      />
    </div>
  );
};

export default AadhaarItem;
