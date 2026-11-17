import React, { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Landmark,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldAlert,
  Save,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  bankAccountDetailsSchema,
  type BankAccountFormInput,
  type BankAccountFormValues,
} from "@/schemas/doctor/settings/kyc-settings.schema";

import { Field } from "@/components/shared/admin/settings/settings-ui.component";

import {
  inputClass,
  primaryButton,
  ghostButton,
} from "@/constants/admin-settings.constant";

import type { KycStatus } from "@/types/doctor-settings";

import { useMutate } from "@/hooks/use-mutate.hook";
import { updateBankDetails } from "@/services/doctor.service";

export interface BankDetailsResponse {
  section: "KYC_BANK";
  accountHolderName: string;
  maskedAccountNumber: string;
  accountNumber: string;
  bankName: string;
  accountType: BankAccountFormValues["accountType"];
  ifscCode: string;
  status: KycStatus;
  rejectionReason: string | null;
  updatedAt: Date;
}

export interface BankAccountItemProps {
  details: BankDetailsResponse;
  isDark: boolean;
}

export const BankAccountItem: React.FC<BankAccountItemProps> = ({
  details,
  isDark,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [status, setStatus] = useState<KycStatus>(details.status);

  const [bankDetails, setBankDetails] = useState<BankDetailsResponse>(details);

  const pendingPayloadRef = useRef<BankAccountFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BankAccountFormInput, unknown, BankAccountFormValues>({
    resolver: zodResolver(bankAccountDetailsSchema),
    defaultValues: {
      section: "KYC_BANK",
      accountHolderName: details.accountHolderName,
      accountNumber: details.accountNumber || "",
      confirmAccountNumber: details.accountNumber || "",
      bankName: details.bankName,
      accountType: details.accountType,
      ifscCode: details.ifscCode,
    },
  });

  useEffect(() => {
    setBankDetails(details);
    setStatus(details.status);

    reset({
      section: "KYC_BANK",
      accountHolderName: details.accountHolderName,
      accountNumber: details.accountNumber || "",
      confirmAccountNumber: details.accountNumber || "",
      bankName: details.bankName,
      accountType: details.accountType,
      ifscCode: details.ifscCode,
    });
  }, [details, reset]);
  const themedInputClass = `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  const maskAccountNumber = (accountNumber: string) => {
    if (!accountNumber || accountNumber.length < 4) {
      return accountNumber;
    }

    return `•••• •••• ${accountNumber.slice(-4)}`;
  };

  const { mutate, isPending } = useMutate(updateBankDetails, {
    onSuccess() {
      const submittedData = pendingPayloadRef.current;

      if (submittedData) {
        setBankDetails((previous) => ({
          ...previous,
          accountHolderName: submittedData.accountHolderName,
          maskedAccountNumber: maskAccountNumber(submittedData.accountNumber),
          bankName: submittedData.bankName,
          accountType: submittedData.accountType,
          ifscCode: submittedData.ifscCode,
        }));

        reset({
          section: "KYC_BANK",
          accountHolderName: submittedData.accountHolderName,
          accountNumber: submittedData.accountNumber,
          confirmAccountNumber: submittedData.confirmAccountNumber,
          bankName: submittedData.bankName,
          accountType: submittedData.accountType,
          ifscCode: submittedData.ifscCode,
        });
      }

      setStatus("PENDING");
      setIsEditing(false);

      pendingPayloadRef.current = null;
    },
  });

  const onSubmit: SubmitHandler<BankAccountFormValues> = async (data) => {
    const payload: BankAccountFormValues = {
      ...data,
      section: "KYC_BANK",
    };

    pendingPayloadRef.current = payload;

    mutate(payload);
  };

const handleCancel = () => {
  reset({
    section: "KYC_BANK",
    accountHolderName: bankDetails.accountHolderName,
    accountNumber: bankDetails.accountNumber || "",
    confirmAccountNumber: bankDetails.accountNumber || "",
    bankName: bankDetails.bankName,
    accountType: bankDetails.accountType,
    ifscCode: bankDetails.ifscCode,
  });

  setIsEditing(false);

  toast("Bank changes discarded", {
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
            Active & Verified
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
            <Landmark size={20} className="text-primary" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h4
                className={`text-sm sm:text-base font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Settlement Bank Account
              </h4>

              {getStatusBadge()}
            </div>

            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Direct electronic fund transfers (NEFT / RTGS / IMPS) for patient
              consultation payouts.
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={isPending || status === "VERIFIED"}
          onClick={() => setIsEditing((previous) => !previous)}
          className={`${ghostButton} text-xs self-start sm:self-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isEditing ? "Close" : "Update Bank Details"}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Account Holder */}
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
                Account Holder
              </span>

              <span
                className={`text-sm font-semibold mt-1 block truncate ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {bankDetails.accountHolderName || "Not provided"}
              </span>
            </div>

            {/* Account Number */}
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
                Account Number
              </span>

              <span
                className={`text-sm font-semibold font-mono mt-1 block ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {bankDetails.maskedAccountNumber || "Not provided"}
              </span>
            </div>

            {/* Bank Name & Type */}
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
                Bank Name & Type
              </span>

              <span
                className={`text-sm font-medium mt-1 block truncate ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {bankDetails.bankName || "Not provided"} (
                {bankDetails.accountType})
              </span>
            </div>

            {/* IFSC Code */}
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
                IFSC Code
              </span>

              <span
                className={`text-sm font-semibold font-mono tracking-wider mt-1 block ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {bankDetails.ifscCode || "Not provided"}
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Account Holder Name */}
              <Field label="Account Holder Name" isDark={isDark}>
                <input
                  {...register("accountHolderName")}
                  className={themedInputClass}
                  placeholder="Doctor / Clinic Account Name"
                  disabled={isPending}
                />

                {errors.accountHolderName && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.accountHolderName.message}
                  </p>
                )}
              </Field>

              {/* Bank Name */}
              <Field label="Bank Name" isDark={isDark}>
                <input
                  {...register("bankName")}
                  className={themedInputClass}
                  placeholder="e.g. HDFC Bank, SBI, ICICI"
                  disabled={isPending}
                />

                {errors.bankName && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.bankName.message}
                  </p>
                )}
              </Field>

              {/* Account Type */}
              <Field label="Account Type" isDark={isDark}>
                <select
                  {...register("accountType")}
                  className={themedInputClass}
                  disabled={isPending}
                >
                  <option value="SAVINGS">Savings Account</option>
                  <option value="CURRENT">Current / Business Account</option>
                </select>

                {errors.accountType && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.accountType.message}
                  </p>
                )}
              </Field>

              {/* Account Number */}
              <Field label="Account Number" isDark={isDark}>
                <input
                  {...register("accountNumber")}
                  className={`${themedInputClass} font-mono`}
                  placeholder="Enter 9-18 digit account number"
                  autoComplete="off"
                  disabled={isPending}
                />

                {errors.accountNumber && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.accountNumber.message}
                  </p>
                )}
              </Field>

              {/* Confirm Account Number */}
              <Field label="Confirm Account Number" isDark={isDark}>
                <input
                  {...register("confirmAccountNumber")}
                  className={`${themedInputClass} font-mono`}
                  placeholder="Re-enter account number"
                  autoComplete="off"
                  disabled={isPending}
                />

                {errors.confirmAccountNumber && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.confirmAccountNumber.message}
                  </p>
                )}
              </Field>

              {/* IFSC Code */}
              <Field label="IFSC Code" isDark={isDark}>
                <input
                  {...register("ifscCode")}
                  className={`${themedInputClass} uppercase font-mono tracking-wider`}
                  placeholder="e.g. HDFC0001234"
                  maxLength={11}
                  disabled={isPending}
                />

                {errors.ifscCode && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.ifscCode.message}
                  </p>
                )}
              </Field>
            </div>

            {/* Verification Notice */}
            <div
              className={`p-3 rounded-xl flex items-center gap-2.5 text-xs ${
                isDark
                  ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}
            >
              <ShieldAlert size={16} className="shrink-0" />

              <span>
                A nominal ₹1 test deposit will be initiated to verify account
                ownership before routing payouts.
              </span>
            </div>

            {/* Rejection Reason */}
            {status === "REJECTED" && bankDetails.rejectionReason && (
              <div className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-500">
                <strong>Rejection reason:</strong> {bankDetails.rejectionReason}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isPending}
                onClick={handleCancel}
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
                    <Clock size={15} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Update Bank Account
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BankAccountItem;
