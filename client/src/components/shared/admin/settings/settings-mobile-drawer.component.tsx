import React from "react";
import { X } from "lucide-react";
import { SettingsNavigation } from "./settings-navigation.component";
import type {
  SettingsSection,
  SettingsKey,
} from "../../../../types/admin-settings";
import { createPortal } from "react-dom";

export interface SettingsMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: SettingsSection;
  activeSetting: SettingsKey;
  isChanged: (key: SettingsKey) => boolean;
  onNavigate: (section: SettingsSection, setting: SettingsKey) => void;
  isDark: boolean;
}

export const SettingsMobileDrawer: React.FC<SettingsMobileDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  activeSetting,
  isChanged,
  onNavigate,
  isDark,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] lg:hidden">
      <button
        type="button"
        aria-label="Close settings navigation"
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px] cursor-pointer"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Settings navigation"
        className={`custom-scrollbar ${isDark ? 'scrollbar-dark' : 'scrollbar-light'}  scrollbar-none absolute inset-y-0 left-0 w-[min(320px,85vw)] border-r shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200 ${
          isDark
            ? "bg-[#0b1622] border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isDark ? "border-white/8" : "border-gray-200"
          }`}
        >
          <p
            className={`font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Settings
          </p>

          <button
            type="button"
            aria-label="Close settings navigation"
            onClick={onClose}
            className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              isDark
                ? "hover:bg-white/5 text-[#8b9ab0] hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <SettingsNavigation
            activeSection={activeSection}
            activeSetting={activeSetting}
            isChanged={isChanged}
            onNavigate={onNavigate}
            isDark={isDark}
          />
        </div>
      </aside>
    </div>,
    document.body
  );
};

export default SettingsMobileDrawer;