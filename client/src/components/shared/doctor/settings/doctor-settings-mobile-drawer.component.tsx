import React, { useEffect } from "react";
import { X } from "lucide-react";
import { DoctorSettingsNavigation } from "./doctor-settings-navigation.component";
import type {
  DoctorSettingsSection,
  DoctorSettingsKey,
} from "@/types/doctor-settings";

export interface DoctorSettingsMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: DoctorSettingsSection;
  activeSetting: DoctorSettingsKey;
  isChanged: (key: DoctorSettingsKey) => boolean;
  onNavigate: (section: DoctorSettingsSection, setting: DoctorSettingsKey) => void;
  isDark: boolean;
}

export const DoctorSettingsMobileDrawer: React.FC<DoctorSettingsMobileDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  activeSetting,
  isChanged,
  onNavigate,
  isDark,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Settings navigation drawer"
      className="fixed inset-0 z-50 lg:hidden"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 left-0 w-full max-w-xs p-6 shadow-2xl flex flex-col transition-transform ${
          isDark
            ? "bg-[#0b1622] border-r border-white/10"
            : "bg-white border-r border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <h2
            className={`text-base font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Doctor Settings
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings drawer"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? "text-[#8b9ab0] hover:text-white hover:bg-white/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          <DoctorSettingsNavigation
            activeSection={activeSection}
            activeSetting={activeSetting}
            isChanged={isChanged}
            onNavigate={(sec, set) => {
              onNavigate(sec, set);
              onClose();
            }}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorSettingsMobileDrawer;
