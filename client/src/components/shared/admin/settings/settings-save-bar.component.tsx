
import React from "react";
import {
  CheckCircle2,
  RotateCcw,
  Save,
  LoaderCircle,
} from "lucide-react";

import {
  ghostButton,
  primaryButton,
} from "../../../../constants/admin-settings.constant";

export interface SettingsSaveBarProps {
  isDirty: boolean;
  isPending: boolean;
  changedCount: number;
  activeGroupLabel: string;
  onSave: () => void;
  onReset: () => void;
  isDark: boolean;
}

export const SettingsSaveBar: React.FC<SettingsSaveBarProps> = ({
  isDirty,
  isPending,
  changedCount,
  activeGroupLabel,
  onSave,
  onReset,
  isDark,
}) => {
  return (
    <div
      className={`sticky bottom-4 z-10 flex items-center justify-between gap-3 px-4 sm:px-5 py-3 rounded-2xl border backdrop-blur-md transition-all ${
        isDark
          ? "border-white/10 bg-[#0b1622]/90 shadow-xl shadow-black/30"
          : `border-gray-200 bg-white ${
              isDirty
                ? "shadow-sm shadow-gray-200/40"
                : "shadow-none"
            }`
      }`}
    >
      <p
        className={`hidden sm:flex items-center gap-2 text-xs ${
          isDark ? "text-[#9fb0c5]" : "text-gray-500"
        }`}
      >
        {isPending ? (
          <>
            <LoaderCircle
              size={14}
              className="animate-spin text-primary"
            />
            Updating settings...
          </>
        ) : isDirty ? (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {changedCount}{" "}
            {changedCount === 1
              ? "section has"
              : "sections have"}{" "}
            unsaved changes
          </>
        ) : (
          <>
            <CheckCircle2 size={14} className="text-primary" />
            All changes saved
          </>
        )}
      </p>

      <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
        <button
          type="button"
          onClick={onReset}
          disabled={!isDirty || isPending}
          className={`${ghostButton} ${
            isDark
              ? ""
              : "!border-gray-200 !bg-white !text-gray-600 hover:!bg-gray-100 hover:!text-gray-900"
          }`}
        >
          <RotateCcw size={15} />
          Reset
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={!isDirty || isPending}
          className={`${primaryButton} flex-1 sm:flex-none !text-white`}
        >
          {isPending ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Save size={16} />
              Save {activeGroupLabel.toLowerCase()} settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsSaveBar;
