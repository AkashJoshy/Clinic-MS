import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Download,
  AlertTriangle,
  Plane,
  Save,
  Trash2,
  FileSpreadsheet,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import { Field } from "@/components/shared/admin/settings/settings-ui.component";
import {
  inputClass,
  primaryButton,
  ghostButton,
} from "@/constants/admin-settings.constant";
import { initialDoctorSettings } from "@/constants/doctor-settings.constant";
import { accountManagementSchema } from "@/schemas/doctor/settings/account-management.schema";
import type { DoctorSettingsValues } from "@/types/doctor-settings";

export interface AccountManagementSectionProps {
  isDark: boolean;
}

export const AccountManagementSection: React.FC<
  AccountManagementSectionProps
> = ({ isDark }) => {
  const { register, watch, resetField } =
    useFormContext<DoctorSettingsValues>();

  const currentAccount = watch("accountManagement");
  const practiceStatus = currentAccount.practiceStatus;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const themedInputClass = `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  const handleDeactivate = () => {
    console.log(
      "[Doctor Settings] Doctor requested temporary account deactivation",
    );
    toast(
      "Deactivation request submitted. A platform administrator will confirm via email.",
      {
        icon: "⚠️",
      },
    );
  };

  const handleDeleteAccount = () => {
    console.log(
      "[Doctor Settings] Doctor requested permanent account deletion",
    );
    setShowDeleteConfirm(false);
    toast.error("Account deletion requested. 30-day grace period initiated.");
  };

  return (
    <div className="space-y-6">
      <div
        className={`p-5 sm:p-6 rounded-2xl border border-rose-500/20 transition-colors ${
          isDark ? "bg-rose-950/10" : "bg-rose-50/50"
        }`}
      >
        <div className="flex items-center gap-3.5 pb-4 border-b border-rose-500/20 mb-5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-rose-400" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-rose-400">
              Danger Zone
            </h4>
            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Irreversible actions related to your clinical profile and account
              lifecycle.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-rose-500/10">
            <div>
              <h5
                className={`text-sm font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Temporarily Deactivate Account
              </h5>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? "text-[#8b9ab0]" : "text-gray-500"
                }`}
              >
                Hides your profile from all patient searches and halts all
                future booking slots. You can reactivate anytime.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDeactivate}
              className={`${ghostButton} text-xs border-amber-500/30 text-amber-400 hover:bg-amber-500/10 cursor-pointer shrink-0`}
            >
              Deactivate Account
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3">
            <div>
              <h5
                className={`text-sm font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Delete Doctor Account
              </h5>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? "text-[#8b9ab0]" : "text-gray-500"
                }`}
              >
                Permanently delete your doctor credentials, practice history,
                and all stored profile data after completing mandatory legal
                audits.
              </p>
            </div>
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
              >
                <Trash2 size={13} className="inline mr-1" />
                Delete Account
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`${ghostButton} text-xs`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementSection;
