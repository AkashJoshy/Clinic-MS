import React from "react";
import { doctorNavigation } from "@/constants/doctor-settings.constant";
import type {
  DoctorSettingsSection,
  DoctorSettingsKey,
} from "@/types/doctor-settings";

export interface DoctorSettingsNavigationProps {
  activeSection: DoctorSettingsSection;
  activeSetting: DoctorSettingsKey;
  isChanged: (key: DoctorSettingsKey) => boolean;
  onNavigate: (section: DoctorSettingsSection, setting: DoctorSettingsKey) => void;
  isDark: boolean;
}

export const DoctorSettingsNavigation: React.FC<DoctorSettingsNavigationProps> = ({
  activeSection,
  activeSetting,
  isChanged,
  onNavigate,
  isDark,
}) => (
  <nav aria-label="Doctor Settings Navigation" className="space-y-6 ">
    {doctorNavigation.map((group) => {
      const groupActive = group.id === activeSection;

      return (
        <div key={group.id} className="space-y-1.5">
          <button
            type="button"
            onClick={() => onNavigate(group.id, group.items[0].id)}
            className={`w-full text-left px-3 pb-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              groupActive
                ? isDark
                  ? "text-primary"
                  : "text-primary"
                : isDark
                  ? "text-[#6b7c93] hover:text-[#9fb0c5]"
                  : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {group.label}
          </button>

          <div className="space-y-1">
            {group.items.map((item) => {
              const ItemIcon = item.icon;
              const isActive = groupActive && activeSetting === item.id;
              const changed = isChanged(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(group.id, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    isActive
                      ? isDark
                        ? "bg-primary/15 text-primary shadow-xs font-semibold"
                        : "bg-primary/10 text-primary font-semibold"
                      : isDark
                        ? "text-[#9fb0c5] hover:bg-white/5 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-primary" />
                  )}

                  <ItemIcon size={17} className="shrink-0" />

                  <span className="flex-1 min-w-0 truncate">
                    {item.label}
                  </span>

                  {changed && (
                    <span
                      className="w-2 h-2 rounded-full bg-amber-400 shrink-0 ring-2 ring-amber-400/20"
                      title="Unsaved changes"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    })}
  </nav>
);

export default DoctorSettingsNavigation;
