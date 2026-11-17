import React from "react";
import { Check, Plus } from "lucide-react";
import { defaultBrandColors } from "../../constants/admin-settings.constant";
import { useAuthStore } from "@/store";

export interface BrandColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  presets?: string[];
  allowCustom?: boolean;
  showValue?: boolean;
  className?: string;
}

export const BrandColorPicker: React.FC<BrandColorPickerProps> = ({
  value,
  onChange,
  label = "Select brand color",
  presets = defaultBrandColors,
  allowCustom = true,
  showValue = true,
  className = "",
}) => {
  const admin = useAuthStore((state) => state.users.admin);
  const isDark = admin?.theme === "DARK";

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      role="group"
      aria-label={label}
    >
      {presets.map((color) => {
        const selected = value?.toLowerCase() === color.toLowerCase();

        return (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            aria-label={`Use ${color}`}
            aria-pressed={selected}
            style={{ backgroundColor: color }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dc465] ${
              selected
                ? `ring-2 ${
                    isDark
                      ? "ring-white/80 ring-offset-[#0d1a27]"
                      : "ring-gray-500 ring-offset-white"
                  } ring-offset-2`
                : ""
            }`}
          >
            {selected && (
              <Check size={14} className="text-[#05130a]" strokeWidth={3} />
            )}
          </button>
        );
      })}

      {allowCustom && (
        <label
          className={`relative w-8 h-8 rounded-full border border-dashed overflow-hidden cursor-pointer transition-colors ${
            isDark
              ? "border-white/25 hover:border-white/60 bg-white/5"
              : "border-gray-400 hover:border-[#1dc465] bg-gray-100"
          }`}
        >
          <span className="sr-only">Pick a custom color</span>

          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-2 w-12 h-12 cursor-pointer opacity-0"
          />

          <span
            className={`absolute inset-0 flex items-center justify-center ${
              isDark ? "text-white/70" : "text-gray-600"
            }`}
            aria-hidden
          >
            <Plus size={14} />
          </span>
        </label>
      )}

      {showValue && (
        <span
          className={`ml-1 text-xs font-mono ${
            isDark ? "text-[#8b9ab0]" : "text-gray-500"
          }`}
        >
          {value}
        </span>
      )}
    </div>
  );
};

export default BrandColorPicker;
