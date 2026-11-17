
import React from "react";
import { navigation } from "../../../../constants/admin-settings.constant";
import type {
  SettingsSection,
  SettingsKey,
} from "../../../../types/admin-settings";

export interface SettingsNavigationProps {
  activeSection: SettingsSection;
  activeSetting: SettingsKey;
  isChanged: (key: SettingsKey) => boolean;
  onNavigate: (section: SettingsSection, setting: SettingsKey) => void;
  isDark: boolean;
}

export const SettingsNavigation: React.FC<SettingsNavigationProps> = ({
  activeSection,
  activeSetting,
  isChanged,
  onNavigate,
  isDark,
}) => (
  <nav aria-label="Settings" className="space-y-5">
    {navigation.map((group) => {
      const groupActive = group.id === activeSection;

      return (
        <div key={group.id}>
          <button
            type="button"
            onClick={() => onNavigate(group.id, group.items[0].id)}
            className={`w-full text-left px-3 pb-2 text-xs font-semibold transition-colors cursor-pointer ${
              groupActive
                ? isDark
                  ? "text-white"
                  : "text-gray-900"
                : isDark
                  ? "text-[#6b7c93] hover:text-[#9fb0c5]"
                  : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {group.label}
          </button>

          <div className="space-y-0.5">
            {group.items.map((item) => {
              const ItemIcon = item.icon;
              const isActive = groupActive && activeSetting === item.id;
              const changed = groupActive && isChanged(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(group.id, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[13px] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : isDark
                        ? "text-[#9fb0c5] hover:bg-white/5 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-primary" />
                  )}

                  <ItemIcon size={16} className="shrink-0" />

                  <span className="flex-1 min-w-0 truncate">
                    {item.label}
                  </span>

                  {changed && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
                      aria-label="Has unsaved changes"
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

export default SettingsNavigation;
